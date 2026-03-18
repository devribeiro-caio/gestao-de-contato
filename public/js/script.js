$(document).ready(function () {

  const LIMIT = 5; // quantidade de contatos exibidos por página
  let currentPage = 1;

  // Recupera do localStorage o último filtro e ordenação usados pelo usuário.
  // Isso garante que ao recarregar a página, o estado anterior é restaurado.
  let currentOrder  = localStorage.getItem('order')  || 'name';
  let currentSearch = localStorage.getItem('search') || '';

  // Aplica os valores recuperados nos campos visuais
  $('#orderBy').val(currentOrder);
  $('#search').val(currentSearch);

  // -----------------------------------------------------------------------
  // escapeHtml: previne XSS (Cross-Site Scripting).
  // Qualquer dado vindo do banco que contenha caracteres especiais como
  // <, >, ", ' seria interpretado como HTML pelo navegador sem esse escape.
  // Ex: um nome cadastrado como "<script>alert(1)</script>" seria executado
  // sem esse tratamento.
  // -----------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#039;');
  }


  // -----------------------------------------------------------------------
  // loadContacts: busca os contatos via AJAX e renderiza na tabela.
  // Envia à API (list.php) a página atual, o limite e a ordenação escolhida.
  // A filtragem por nome/e-mail é feita no front-end sobre os dados retornados,
  // evitando uma requisição extra ao servidor a cada tecla digitada.
  // -----------------------------------------------------------------------
  function loadContacts(page) {
    currentPage = page || 1;

    $.getJSON(BASE_URL + '/index.php?url=contact/list', {
      order: currentOrder,
      page:  currentPage,
      limit: LIMIT
    }, function (response) {
      let rows = '';

      // Filtra localmente pelo termo digitado no campo de busca
      let filtered = response.data.filter(function (c) {
        let term = currentSearch.toLowerCase();
        return c.name.toLowerCase().includes(term) ||
               c.email.toLowerCase().includes(term);
      });

      if (filtered.length === 0) {
        rows = '<tr><td colspan="6" class="text-center text-muted">Nenhum contato encontrado.</td></tr>';
      } else {
        // Monta as linhas da tabela escapando cada valor para evitar XSS
        filtered.forEach(function (c) {
          // Exibe a foto do contato se existir, ou um avatar com a inicial do nome
          let inicial = escapeHtml(c.name.charAt(0).toUpperCase());
          let fotoHtml = c.photo
            ? `<img src="${BASE_URL}/uploads/${escapeHtml(c.photo)}" alt="Foto" class="contact-photo">`
            : `<div class="contact-photo-placeholder">${inicial}</div>`;

          rows += `<tr>
            <td>${fotoHtml}</td>
            <td>${escapeHtml(c.name)}</td>
            <td>${escapeHtml(c.email)}</td>
            <td>${escapeHtml(c.phone)}</td>
            <td>${escapeHtml(c.birthdate)}</td>
            <td>
              <button class="btn btn-action edit"   data-id="${escapeHtml(c.id)}" title="Editar"><img src="${BASE_URL}/assets/icon-editar.png" alt="Editar"></button>
              <button class="btn btn-action delete" data-id="${escapeHtml(c.id)}" title="Remover"><img src="${BASE_URL}/assets/icon-remover.png" alt="Remover"></button>
            </td>
          </tr>`;
        });
      }

      // Substitui o conteúdo do tbody com as novas linhas (manipulação do DOM)
      $('#contactsTable tbody').html(rows);

      // Atualiza os botões de paginação com o total retornado pelo servidor
      renderPagination(response.total);
    });
  }

  // -----------------------------------------------------------------------
  // renderPagination: calcula o número de páginas e gera os botões.
  // O total de registros vem do back-end (COUNT(*) no PHP).
  // Math.ceil garante que registros de uma página incompleta sejam exibidos.
  // Ex: 11 registros com LIMIT 5 => ceil(11/5) = 3 páginas.
  // -----------------------------------------------------------------------
  function renderPagination(total) {
    const pages = Math.ceil(total / LIMIT);
    const MAX_VISIBLE = 5; // limita a sequência de páginas exibidas
    let html = '';

    // Oculta a paginação quando há apenas uma página
    if (pages <= 1) {
      $('#pagination').html('');
      return;
    }

    function pageItem(page, label, disabled, active) {
      const liClass = [
        'page-item',
        disabled ? 'disabled' : '',
        active ? 'active' : ''
      ].filter(Boolean).join(' ');

      const safeLabel = label ?? String(page);
      const dataAttr = disabled ? '' : `data-page="${page}"`;
      return `<li class="${liClass}"><a class="page-link" href="#" ${dataAttr}>${safeLabel}</a></li>`;
    }

    function ellipsis() {
      return `<li class="page-item disabled"><span class="page-link">…</span></li>`;
    }

    const half = Math.floor(MAX_VISIBLE / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(pages, start + MAX_VISIBLE - 1);
    start = Math.max(1, end - MAX_VISIBLE + 1);

    html += '<nav aria-label="Paginação"><ul class="pagination pagination-sm justify-content-center gap-1">';

    // Anterior
    html += pageItem(currentPage - 1, '«', currentPage === 1, false);

    // Primeira página + reticências
    if (start > 1) {
      html += pageItem(1, '1', false, currentPage === 1);
      if (start > 2) html += ellipsis();
    }

    // Janela de páginas
    for (let i = start; i <= end; i++) {
      html += pageItem(i, String(i), false, i === currentPage);
    }

    // Última página + reticências
    if (end < pages) {
      if (end < pages - 1) html += ellipsis();
      html += pageItem(pages, String(pages), false, currentPage === pages);
    }

    // Próximo
    html += pageItem(currentPage + 1, '»', currentPage === pages, false);

    html += '</ul></nav>';

    $('#pagination').html(html);
  }

  // Delegação de eventos: captura cliques nos botões de página,
  // incluindo os que ainda não existiam quando a página foi carregada.
  $(document).on('click', '#pagination .page-link[data-page]', function (e) {
    e.preventDefault();
    const page = parseInt($(this).attr('data-page'), 10);
    if (!Number.isNaN(page)) loadContacts(page);
  });

  // Carrega a primeira página ao iniciar
  loadContacts(1);

  // -----------------------------------------------------------------------
  // Submit do formulário: trata tanto o cadastro quanto a atualização.
  // A decisão de qual endpoint chamar (insert ou update) é feita verificando
  // se existe um campo hidden com name="id" no formulário — ele é adicionado
  // dinamicamente pelo botão Editar e removido após salvar.
  // Usa FormData em vez de serialize() para suportar o upload da foto,
  // já que serialize() ignora campos do tipo file.
  // -----------------------------------------------------------------------
  $('#contatoForm').on('submit', function (e) {
    e.preventDefault();

    let email = $("input[name='email']").val();
    let phone = $("input[name='phone']").val();

    // Validação no front-end — duplica a validação do back-end
    // para dar feedback imediato sem precisar de requisição
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^[0-9]{8,15}$/;

    if (!emailRegex.test(email)) {
      alert('E-mail inválido!');
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('Telefone deve conter apenas números (8-15 dígitos).');
      return;
    }

    // Se existe input hidden com id => é uma edição, senão é um cadastro
    let action = $('#contatoForm input[name="id"]').length
      ? BASE_URL + '/index.php?url=contact/update'
      : BASE_URL + '/index.php?url=contact/insert';

    let formData = new FormData(this);

    // processData: false e contentType: false são obrigatórios ao usar
    // FormData, pois o jQuery não deve serializar nem definir o Content-Type
    // manualmente — o navegador faz isso automaticamente com o boundary correto
    $.ajax({
      url:         action,
      type:        'POST',
      data:        formData,
      processData: false,
      contentType: false,
      dataType:    'json',
      success: function (response) {
        if (response.success) {
          alert(response.success);

          // Reseta o formulário e remove o campo hidden de id
          $('#contatoForm')[0].reset();
          $('#contatoForm input[name="id"]').remove();

          // Volta o botão ao estado inicial de cadastro
          $('#contatoForm button[type="submit"]')
             .text('Cadastrar')
             .removeClass('btn-success')
             .addClass('btn-primary');

          loadContacts(currentPage);
        } else if (response.error) {
          alert(response.error);
        }
      }
    });
  });

  // -----------------------------------------------------------------------
  // Editar: lê os valores diretamente das células da linha clicada
  // e preenche o formulário. Adiciona (ou atualiza) um input hidden com o id
  // para que o submit saiba que se trata de uma atualização.
  // -----------------------------------------------------------------------
  $(document).on('click', '.edit', function () {
    let id   = $(this).data('id');
    let row  = $(this).closest('tr');

    // Lê cada coluna pelo índice (eq) da célula na linha
    // índice 0 = foto, 1 = nome, 2 = email, 3 = telefone, 4 = birthdate
    let name      = row.find('td:eq(1)').text();
    let email     = row.find('td:eq(2)').text();
    let phone     = row.find('td:eq(3)').text();
    let birthdate = row.find('td:eq(4)').text();

    $("input[name='name']").val(name);
    $("input[name='email']").val(email);
    $("input[name='phone']").val(phone);
    $("input[name='birthdate']").val(birthdate);

    // Adiciona o campo hidden apenas se ainda não existir no formulário
    if ($('#contatoForm input[name="id"]').length === 0) {
      $('#contatoForm').append(`<input type="hidden" name="id" value="${id}">`);
    }
    $('#contatoForm input[name="id"]').val(id);

    // Muda o botão visualmente para indicar modo de edição
    $('#contatoForm button[type="submit"]')
      .text('Atualizar')
      .removeClass('btn-primary')
      .addClass('btn-success');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Remover contato com confirmação antes de enviar ao back-end
  $(document).on('click', '.delete', function () {
    if (!confirm('Deseja realmente remover este contato?')) return;

    let id = $(this).data('id');

    $.ajax({
        url: BASE_URL + '/index.php?url=contact/delete',
        type: 'POST',
        data: { id: id },
        dataType: 'json',
      success: function (response) {
        if (response.success) {
          alert(response.success);
          loadContacts(currentPage);
        } else if (response.error) {
          alert(response.error);
        }
      }
    });
  });

  // -----------------------------------------------------------------------
  // Filtro dinâmico: recarrega os contatos a cada tecla digitada.
  // O valor é salvo no localStorage para persistir entre recarregamentos.
  // A filtragem em si ocorre dentro de loadContacts, no array retornado.
  // -----------------------------------------------------------------------
  $('#search').on('keyup', function () {
    currentSearch = $(this).val();
    localStorage.setItem('search', currentSearch);
    loadContacts(1); // volta para a primeira página ao filtrar
  });

  // Ordenação: salva a preferência no localStorage e recarrega da página 1
  $('#orderBy').on('change', function () {
    currentOrder = $(this).val();
    localStorage.setItem('order', currentOrder);
    loadContacts(1);
  });

});

