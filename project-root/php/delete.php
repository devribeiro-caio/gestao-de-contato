<?php
include "db.php";

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
$stmt->bind_param("i", $id);

if($stmt->execute()){
    echo "Contato removido com sucesso!";
} else {
    echo "Erro ao remover contato: " . $stmt->error;        
}

$stmt->close(); 
$conn->close();
?>
