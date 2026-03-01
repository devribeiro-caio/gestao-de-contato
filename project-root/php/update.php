<?php
// Atualiza os dados de um contato existente.
// Recebe id, name, email, phone e birthdate via POST.
// Usa prepared statements para prevenir SQL Injection.

include "db.php";

$id        = intval($_POST['id']); // garante que o id é inteiro
$name      = $_POST['name'];
$email     = $_POST['email'];
$phone     = $_POST['phone'];
$birthdate = $_POST['birthdate'] ?? null; // campo opcional

// Validação de e-mail no back-end
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido!");
}

// Telefone deve conter apenas dígitos (8 a 15 caracteres)
if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
    die("Telefone inválido!");
}

// Atualiza o contato usando prepared statement
$stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, birthdate = ? WHERE id = ?");
$stmt->bind_param("ssssi", $name, $email, $phone, $birthdate, $id);

if ($stmt->execute()) {
    echo "Contato atualizado com sucesso!";
} else {
    echo "Erro ao atualizar contato: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
