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
