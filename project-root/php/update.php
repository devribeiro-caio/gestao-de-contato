<?php
include "db.php";

$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$birthday = $_POST[''];

// Validações
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido!");
}
if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
    die("Telefone inválido!");
}


$stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, birthday = ? WHERE id = ?");
$stmt->bind_param("ssssi", $name, $email, $phone, $birthday, $id);

if( $stmt->execute() ){
    echo "Contato atualizado com sucesso!";
} else {
    echo "Erro ao atualizar contato: " . $stmt->error;
}
$stmt->close();
$conn->close();


?>


