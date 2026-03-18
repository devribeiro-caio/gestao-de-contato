<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Contatos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/css/style.css">
</head>
<body class="container">

    <h2>Cadastro de Contatos</h2>
    <div class="card-form">
        <form id="contatoForm" method="POST" enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Nome" class="form-control" required>
            <input type="email" name="email" placeholder="Email" class="form-control" required>
            <input type="text" name="phone" placeholder="Telefone" class="form-control" required>
            <input type="date" name="birthdate" placeholder="dd/mm/aaaa" class="form-control">
            <input type="file" name="photo" accept="image/*" class="form-control">
            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
    </div>

    <h2>Lista de Contatos</h2>
    <div class="filters-row">
        <div class="search-container">
            <input type="text" id="search" placeholder="Buscar por nome ou email" class="form-control">
        </div>
        <select id="orderBy" class="form-select">
            <option value="name">Ordenar por Nome</option>
            <option value="date">Ordenar por Data de Nascimento</option>
        </select>
    </div>

    <div class="table-container">
        <table class="table" id="contactsTable">
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
    </div>

    <div id="pagination" class="d-flex justify-content-center"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>const BASE_URL = '<?php echo BASE_URL; ?>';</script>
    <script src="<?php echo BASE_URL; ?>/js/script.js"></script>
</body>
</html>
