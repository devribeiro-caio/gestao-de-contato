<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'caiocamisa7');
define('DB_NAME', 'contacts_db');

// Torna o BASE_URL dinâmico para funcionar em qualquer ambiente (localhost, pasta, porta diferente)
$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
$baseUrl = $protocol . "://" . $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
define('BASE_URL', $baseUrl);
