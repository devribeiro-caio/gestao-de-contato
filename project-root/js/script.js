$(document).ready(function () {

  const LIMIT = 5; // quantidade de contatos exibidos por página
  const BASE  = window.APP_BASE || 'project-root/'; // caminho base para os endpoints PHP e assets
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

    $.getJSON(BASE + 'php/list.php', {
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
            ? `<img src="${BASE}assets/${escapeHtml(c.photo)}" alt="Foto" class="contact-photo">`
            : `<div class="contact-photo-placeholder">${inicial}</div>`;

          rows += `<tr>
            <td>${fotoHtml}</td>
            <td>${escapeHtml(c.name)}</td>
            <td>${escapeHtml(c.email)}</td>
            <td>${escapeHtml(c.phone)}</td>
            <td>${escapeHtml(c.birthdate)}</td>
            <td>
              <button class="btn btn-warning btn-sm edit"   data-id="${escapeHtml(c.id)}">Editar</button>
              <button class="btn btn-danger  btn-sm delete" data-id="${escapeHtml(c.id)}">Remover</button>
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
    let pages = Math.ceil(total / LIMIT);
    let html  = '';

    // Oculta a paginação quando há apenas uma página
    if (pages <= 1) {
      $('#pagination').html('');
      return;
    }

    for (let i = 1; i <= pages; i++) {
      // Destaca visualmente o botão da página atual
      let active = (i === currentPage) ? 'btn-primary' : 'btn-outline-primary';
      html += `<button class="btn btn-sm ${active} page-btn" data-page="${i}">${i}</button>`;
    }

    $('#pagination').html(html);
  }

  // Delegação de eventos: captura cliques nos botões de página,
  // incluindo os que ainda não existiam quando a página foi carregada.
  $(document).on('click', '.page-btn', function () {
    loadContacts($(this).data('page'));
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
      ? BASE + 'php/update.php'
      : BASE + 'php/insert.php';

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
      success: function (response) {
        alert(response);

        // Reseta o formulário e remove o campo hidden de id
        $('#contatoForm')[0].reset();
        $('#contatoForm input[name="id"]').remove();

        // Volta o botão ao estado inicial de cadastro
        $('#contatoForm button[type="submit"]')
          .text('Cadastrar')
          .removeClass('btn-success')
          .addClass('btn-primary');

        loadContacts(1);
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

    $.post(BASE + 'php/delete.php', { id: id }, function (response) {
      alert(response);
      loadContacts(currentPage); // permanece na mesma página após remover
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
