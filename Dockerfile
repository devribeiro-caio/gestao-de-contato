FROM php:8.2-cli

WORKDIR /app

# Copia todo o código da aplicação
COPY . /app

# Garante a extensão mysqli para conectar no MySQL do Railway
RUN docker-php-ext-install mysqli

# Porta padrão; no Railway a variável PORT é injetada automaticamente
ENV PORT=8000

# Sobe o servidor embutido do PHP ouvindo em 0.0.0.0:$PORT
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} index.php"]

