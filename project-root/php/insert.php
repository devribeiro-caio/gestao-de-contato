<?php
include "db.php";


$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$birthday = $_POST['birthday'] ?? null;

// Validações
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido!");
}
if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
    die("Telefone inválido!");
}


$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, birthday) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $phone, $birthday);

if($stmt->execute()){
    echo"Contato cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar contato: " . $stmt->error;
}

$photo = null;
if(!empty($_FILES["photo"]["name"])) {
    $target = "../assets" . basename($FILES["photo"]["name"]);
    if(move_uploaded_file($_FILES["photo"]["tmp_name"], $target)) {
        $photo = $FILES["photo"]["name"];
    } else {
        echo "Erro ao enviar foto!";
    }
}
$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, birthday, photo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $phone, $birthday, $photo);




$stmt->close();
$conn->close();
?>
