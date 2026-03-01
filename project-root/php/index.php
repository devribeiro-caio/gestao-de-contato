// FORMULÁRIO E LISTE DE CONTATOS

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Contatos</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="container mt-4">

// Inclui o arquivo de conexão com o banco de dados
    <h2>Cadastro de Contatos</h2>
    <form id="contatoForm" class="mb-4">
        <input type="text" name="name" placeholder="Nome" class="form-control mb-2" required>
        <input type="email" name="email" placeholder="Email" class="form-control mb-2" required>
        <input type="text" name="phone" placeholder="Telefone" class="form-control mb-2" required>
        <input type="date" name="birthday" placeholder="Data de Nascimento" class="form-control mb-2" required>
        <input type="file" name="photo" class="form-control mb-2">
        <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>

    <h2>Lista de Contatos</h2>
    <input type="text" id="search" placeholder="Buscar por nome ou email" class="form-control mb-2">
    <table class="table table-striped" id="contactsTable">
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
            </tr>
        </thead>
    </table>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>