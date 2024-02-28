#!/bin/bash
chmod -R 777 /var/www/html
chown -R www-data:www-data /var/www/html

php artisan migrate:fresh --seed
php artisan scribe:generate
php-fpm
