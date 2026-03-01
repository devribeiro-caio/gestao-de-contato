<?php
// Remove um contato pelo id recebido via POST.
// Usa prepared statement para prevenir SQL Injection.

include "db.php";

$id = intval($_POST['id']); // garante que o id é inteiro

$stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Contato removido com sucesso!";
} else {
    echo "Erro ao remover contato: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
