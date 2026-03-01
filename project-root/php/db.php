<?php
// Credenciais lidas de variáveis de ambiente (produção no Railway)
// ou valores locais como fallback para desenvolvimento com XAMPP
$host   = getenv('MYSQLHOST')     ?: 'localhost';
$user   = getenv('MYSQLUSER')     ?: 'root';
$pass   = getenv('MYSQLPASSWORD') ?: '';
$dbname = getenv('MYSQLDATABASE') ?: 'contacts_db';
$port   = getenv('MYSQLPORT')     ?: 3306;

$conn = new mysqli($host, $user, $pass, $dbname, (int)$port); // Conexão com o banco de dados MySQL

if ($conn->connect_error) {
    die("Erro de Conexão: " . $conn->connect_error);
}
?>
