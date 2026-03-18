<<<<<<< HEAD
# Gestão de Contatos (MVC)

Este projeto foi reestruturado para seguir o padrão de arquitetura **MVC (Model-View-Controller)**, tornando-o mais organizado, seguro e fácil de manter.

## 🚀 Funcionalidades
- ✅ Cadastro, edição e remoção de contatos.
- ✅ Validações robustas no front-end e back-end.
- ✅ Paginação inteligente.
- ✅ Upload de fotos para contatos.
- ✅ Filtro dinâmico por nome ou e-mail.
- ✅ URLs amigáveis via `.htaccess`.

## 📂 Estrutura do Projeto
- **`app/`**: Contém o núcleo da aplicação (Controllers, Models e Views).
- **`config/`**: Arquivos de configuração (banco de dados, constantes).
- **`core/`**: Classes base do framework MVC (Router, Controller, Model, Database).
- **`public/`**: Único ponto de entrada acessível pelo navegador. Contém `index.php`, CSS, JS e uploads.
- **`uploads/`**: Pasta onde as fotos dos contatos são armazenadas.

## 🛠️ Instalação e Configuração

### 1. Banco de Dados
1. Crie um banco de dados chamado `contacts_db`.
2. Importe o arquivo `banco.sql` localizado na raiz do projeto.

### 2. Configuração do PHP
Edite o arquivo `config/config.php` e ajuste as credenciais do seu banco de dados:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'sua_senha');
define('DB_NAME', 'contacts_db');
define('BASE_URL', 'http://localhost/Gestao%20de%20Contato/public');
```

### 3. Servidor Apache (Recomendado)
Se estiver usando XAMPP ou WAMP:
1. Certifique-se de que o módulo `mod_rewrite` está ativado no Apache.
2. O arquivo `.htaccess` na raiz redirecionará automaticamente para a pasta `public/`.
3. Acesse: `http://localhost/Gestao%20de%20Contato/`

### 4. Servidor Embutido do PHP (Atenção)
Para rodar sem Apache, você **precisa** rodar o comando **dentro** da pasta `public`:
```bash
cd public
php -S localhost:8000
```
Ou na raiz do projeto:
```bash
php -S localhost:8000 -t public
```
Acesse: `http://localhost:8000` (não precisa de `/public` no final)

## 🧪 Tecnologias Utilizadas
- **PHP 8+** (OOP & MVC)
- **MySQL/MariaDB**
- **JavaScript/jQuery**
- **Bootstrap 5**
- **Apache (mod_rewrite)**
=======
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
>>>>>>> e41ba12d4773f062a8d01c1b0e042db16dfa6d2f
