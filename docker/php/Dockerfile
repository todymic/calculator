FROM php:8.1-fpm

ENV current_os=linux

RUN apt-get update && \
    apt-get install -y -qq --no-install-recommends \
            libpq-dev \
            libxml2-dev \
            libxslt-dev \
            unzip \
            zlib1g-dev \
    && pecl install -o -f xdebug \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
            intl \
            pdo_mysql

RUN php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/local/bin --filename=composer --2 && chmod +x /usr/local/bin/composer

COPY . /var/www/api
WORKDIR /var/www/api

