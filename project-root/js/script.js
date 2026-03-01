$(document).ready(function() {
  // Cadastrar contato
  $("#contactForm").on("submit", function(e) {
    e.preventDefault();
    $.post("php/insert.php", $(this).serialize(), function(response) {
      alert(response);
      loadContacts();
    });
  });

  // Carregar contatos
  function loadContacts() {
    $.getJSON("php/list.php", function(data) {
      console.log(data); // <-- debug
      let rows = "";
      data.forEach(c => {
        rows += `<tr>
          <td>${c.name}</td>
          <td>${c.email}</td>
          <td>${c.phone}</td>
          <td>${c.birthdate ?? ""}</td>
          <td>
            <button class="btn btn-warning btn-sm edit" data-id="${c.id}">Editar</button>
            <button class="btn btn-danger btn-sm delete" data-id="${c.id}">Remover</button>
          </td>
        </tr>`;
      });
      $("#contactsTable tbody").html(rows);
      $(document).on("click", "edit", function() {
        // Lógica para editar contato
        let id = $(this).data("id");
        let row = $(this).closest("tr");

        // Pega os valores atuais da linha 
        let name = row.find("td:eq(0)").text();
        let email = row.find("td:eq(1)").text();
        let phone = row.find("td:eq(2)").text();
        let birthdate = row.find("td:eq(3)").text();

        // Preenche o formulário com os valores atuais
        $("input[name='name']").val(name);
        $("input[name='email']").val(email);
        $("input[name='phone']").val(phone);
        $("input[name='birthdate']").val(birthdate);

        // Adiciona campo hidden para o ID do contato
        if ($("contactForm input[name='id']").length === 0) {
            $("contactForm").append(`<input type="hidden" name="id" value="${id}">`);
      }
      
      $("#contactForm input[name='id']").val(id);

      //Troca o botão para "Atualizar"
        $("#contactForm button[type='submit']").text("Atualizar").removeClass("btn-primary").addClass("btn-success");

        $("#contactForm").on("submit", function(e) {
  e.preventDefault();

  let action = $("#contactForm input[name='id']").length ? "php/update.php" : "php/insert.php";

  $.post(action, $(this).serialize(), function(response) {
    alert(response);
   
    // Resetar formulário
    $("#contactForm")[0].reset();
    $("#contactForm input[name='id']").remove();
    $("#contactForm button").text("Cadastrar").removeClass("btn-success").addClass("btn-primary");
  });
});
       

    });

    });
  }
  loadContacts();

  // Filtro dinâmico
  $("#search").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $("#contactsTable tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$("#contactForm").on("submit", function(e) {
  e.preventDefault();

  let email = $("input[name='email']").val();
  let phone = $("input[name='phone']").val();

  // Validação simples
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[0-9]{8,15}$/;

  if (!emailRegex.test(email)) {
    alert("E-mail inválido!");
    return;
  }
  if (!phoneRegex.test(phone)) {
    alert("Telefone deve conter apenas números (8-15 dígitos).");
    return;
  }

  $.post("php/insert.php", $(this).serialize(), function(response) {
    alert(response);
    loadContacts();
  });
});

// Remover contato
$(document).on("click", ".delete", function() {
  if (!confirm("Deseja realmente remover este contato?")) return;

  let id = $(this).data("id");

  $.post("php/delete.php", { id: id }, function(response) {
    alert(response);
    loadContacts();
  });
});
