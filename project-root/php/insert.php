<?php
// Insere um novo contato no banco de dados.
// Recebe os dados via POST e, opcionalmente, uma foto via multipart/form-data.
// Realiza validação de e-mail e telefone antes de persistir.
// Usa prepared statements para prevenir SQL Injection.

include "db.php";

$name     = $_POST['name'];
$email    = $_POST['email'];
$phone    = $_POST['phone'];
$birthdate = $_POST['birthdate'] ?? null; // campo opcional

// Validação de e-mail no back-end
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido!");
}

// Telefone deve conter apenas dígitos (8 a 15 caracteres)
if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
    die("Telefone inválido!");
}

// Processa o upload da foto, se enviada
$photo = null;
if (!empty($_FILES["photo"]["name"])) {
    $target = "../assets/" . basename($_FILES["photo"]["name"]);
    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target)) {
        $photo = $_FILES["photo"]["name"];
    } else {
        die("Erro ao enviar foto!");
    }
}

// Insere o contato usando prepared statement
$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, birthdate, photo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $phone, $birthdate, $photo);

if ($stmt->execute()) {
    echo "Contato cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar contato: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
