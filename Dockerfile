FROM php:8.3-fpm

# Installation des dépendances système et des outils nécessaires
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    gnupg

# Nettoyage du cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installation des extensions PHP requises par ton Hostinger (Image 4)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installation de Node.js (Version 20 LTS) pour compiler ton React
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y openssh-client nodejs

# Récupération de Composer (dernière version)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définition du dossier de travail
WORKDIR /var/www

EXPOSE 9000
CMD ["php-fpm"]