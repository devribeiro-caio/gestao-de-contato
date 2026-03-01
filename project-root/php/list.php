<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';




$result = $conn->query("SELECT * FROM contacts ORDER BY name ASC");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
    }
    echo json_encode($data);
    ?>
  
    // Limitar Resultador

  
<?php
include "db.php";

$page = $_GET["page"] ?? 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$stmt = $conn->prepare("SELECT * FROM contacts ORDER BY name ASC LIMIT ? OFFSET ?");
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
 ?>



