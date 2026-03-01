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

    <h2>Cadastro de Contatos</h2>
    <form id="contatoForm" class="mb-4">
        <input type="text" name="name" placeholder="Nome" class="form-control mb-2" required>
        <input type="email" name="email" placeholder="Email" class="form-control mb-2" required>
        <input type="text" name="phone" placeholder="Telefone" class="form-control mb-2" required>
        <input type="date" name="birthdate" placeholder="Data de Nascimento" class="form-control mb-2">
        <input type="file" name="photo" accept="image/*" class="form-control mb-2">
        <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>

    <h2>Lista de Contatos</h2>
    <div class="d-flex gap-2 mb-2">
        <input type="text" id="search" placeholder="Buscar por nome ou email" class="form-control">
        <select id="orderBy" class="form-select w-auto">
            <option value="name">Ordenar por Nome</option>
            <option value="date">Ordenar por Data de Cadastro</option>
        </select>
    </div>

    <table class="table table-striped" id="contactsTable">
        <thead>
            <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <div id="pagination" class="d-flex justify-content-center gap-1 mt-2"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
