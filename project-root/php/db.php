<?php
$host = "Localhost";
$user = "root";
$pass = "";
$dbname = "contacts_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Erro de Conexão: " . $conn->connect_error);

}
?>


