- # Gestão de Contatos
- 
- ## Instalação
- - 🧾 Cadastro de contatos com informações básicas (nome, telefone, e-mail, foto).  
- - ✏️ Edição de contatos existentes.  
- - ❌ Remoção de contatos.  
- - 🔍 Filtro dinâmico para busca rápida.  
- - 📸 Upload de foto para cada contato.
- 
- ## Funcionalidades
- - Cadastro, edição e remoção de contatos.
- - Validações front-end e back-end.
- - Paginação
- - Upload de foto.
- - Filtro dinâmico.

## 🚀 Inicialização ### 
- - Usando XAMPP/WAMP 1. Copie a pasta do projeto para o diretório `htdocs` (XAMPP) ou `www` (WAMP). 


- -  Inicie os serviços **Apache** e **MySQL** pelo painel de controle. 
- - Abra no navegador:
- - http://localhost/gestao-de-contato/index.php

### Usando servidor embutido do PHP
1. No terminal, vá até a pasta do projeto:
```PowerShell
cd "C:\Users\caiok\OneDrive\Área de Trabalho\Gestao de Contato"

Rode: php -S localhost:8000

## Abra no navegador:
http://localhost:8000/index.php
php -v
php -S localhost:8000
http://localhost:8000/index.php

## 🌐 Deploy no Railway (produção)
1. Faça push deste repositório para o GitHub.
2. No Railway:
   - Crie um novo projeto selecionando **Deploy from GitHub** e escolha este repositório.  
   - O Railway vai usar automaticamente o arquivo `nixpacks.toml` com o comando:
     - `php -S 0.0.0.0:${PORT} index.php`
3. Ainda no Railway, adicione um recurso **MySQL** ao projeto.
4. Conecte o recurso MySQL ao serviço PHP; o Railway vai injetar as variáveis de ambiente:
   - `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, `MYSQLPORT`
5. Importe o arquivo `project-root/banco.sql` no banco para criar a tabela `contacts`.
6. Após o deploy, use a URL pública fornecida pelo Railway para acessar a aplicação.

## Tecnologias utilizadas
PHP 8+ → linguagem principal para o backend e integração com o banco.

MySQL/MariaDB → banco de dados relacional para armazenar os contatos.

HTML5 → estrutura das páginas.

CSS3 → estilização e layout responsivo.

JavaScript (ES6+) → interatividade, filtros dinâmicos e validações no front-end.

phpMyAdmin → interface gráfica para gerenciar o banco de dados.

XAMPP/WAMP → servidor local com Apache + PHP + MySQL.


Git/GitHub → versionamento e hospedagem do código.
