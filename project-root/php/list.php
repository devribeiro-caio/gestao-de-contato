<?php
// Retorna a lista de contatos em JSON com suporte a ordenação e paginação.
// Parâmetros GET aceitos:
//   order  => "name" (padrão) ou "date" (order by created_at)
//   page   => número da página (padrão: 1)
//   limit  => itens por página (padrão: 5)

include 'db.php';

// Define a coluna de ordenação com whitelist para evitar SQL injection
$order = $_GET['order'] ?? 'name';
$orderColumn = ($order === 'date') ? 'create_at' : 'name';

// Paginação
$page  = max(1, intval($_GET['page']  ?? 1));
$limit = max(1, intval($_GET['limit'] ?? 5));
$offset = ($page - 1) * $limit;

// Conta o total de registros para o front calcular as páginas
$totalResult = $conn->query("SELECT COUNT(*) AS total FROM contacts");
$total = $totalResult->fetch_assoc()['total'];

// Busca os registros da página atual
$stmt = $conn->prepare("SELECT * FROM contacts ORDER BY $orderColumn ASC LIMIT ? OFFSET ?");
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Retorna dados + total para a paginação no front-end
echo json_encode(['data' => $data, 'total' => (int)$total]);

$stmt->close();
$conn->close();
?>
