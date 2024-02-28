FROM php:8.2-fpm

WORKDIR /var/www/html
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libpq-dev

COPY . /var/www/html
COPY deployment/php.ini /usr/local/etc/php/php.ini
COPY .env.example .env
COPY /deployment/entrypoint.sh /scripts/entrypoint.sh

RUN ["chmod", "+x", "/scripts/entrypoint.sh"]

RUN docker-php-ext-install bcmath ctype dom fileinfo pdo_mysql gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer update
RUN composer install
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/html/storage/framework/cache/data
RUN php artisan key:generate
RUN php artisan storage:link

EXPOSE 9000

ENTRYPOINT ["/scripts/entrypoint.sh"]
