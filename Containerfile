FROM php:8.3-fpm
# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do aplicativo
COPY . /app

# Instalar dependências do sistema
# Instalar Node.js e NPM
# Instalar o Composer
# Instalar extensões do PHP
# Instalar dependências do Composer e do NPM, e construir assets
# Limpar cache

RUN apt-get update -y && apt-get install -y \
    openssl \
    zip \
    unzip \
    git \
    libonig-dev \
    libzip-dev \
    libpq-dev \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && docker-php-ext-install pdo mbstring pdo_pgsql \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && composer install --optimize-autoloader --no-dev && \
    npm install && \
    npm run build && \
    rm -rf node_modules \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 9000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]
