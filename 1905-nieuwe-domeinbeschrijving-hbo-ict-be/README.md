# Fashion Hotspots API Laravel 9

Build with laravel version **10.0**

**Installation**

1. Make sure you have php 8.1 or higher (check with `php -v`), composer,
   node, npm and postgres/mysql installed
2. Clone the project repo to your local device
3. Copy the .env.example file and rename it .env
4. Uncomment or add `extension=gd` to your php.ini
5. Uncomment or add `extension=zip` to your php.ini
6. Run `composer install`
7. Create a database with mysql
    - Add the database name, user and password to the .env
8. Run `php artisan key:generate`
9. Run `php artisan jwt:secret`
10. Run `php artisan storage:link`
11. Run `php artisan migrate --seed`

**Update during development**

1. Run `git pull`
2. Run `composer dumpautoload`
3. Run `php artisan migrate:fresh --seed`
4. Run `php artisan scribe:generate`
5. Run `php artisan serve`

**Run the project**

1. Run `php artisan serve`, hosted at: http://127.0.0.1:8000

## API Documentation
It's important to document all endpoints so that the front-end programmers know
what data they need to send and can retrieve. This is done by placing comments
in controller files. This section shows the B302 comment guidelines using the PHP package
scribe, and the minimal amount of things that need to be documented. For a more
detailed use of scribe use the documentation: https://scribe.knuckles.wtf/laravel/documenting.

### Controllers
Every controller must contain a description of what is does and whether the user needs to be authenticated. 

``@group``: Description

``@authenticated``: User must be authenticated

``@unauthenticated``: User does not have to be authenticated

```php
/**
 * @group User management
 *
 * APIs for managing users
 *
 * @authenticated or @unauthenticated
 */
class UserController {
}
```

If only for some endpoints the user needs to be authenticated, you can
add the ``@authenticated`` tag on a controller method instead of the whole controller. Same with
``@unauthenticated``.

### Endpoints
For every endpoint this at least needs to be documented:

* Title
* Description
* Url params if any
* Body params if any (Post request data)
* Fields in the response object
* An example response if it makes the endpoint more clear

#### Examples
```php
/**
 * @group User management
 *
 * Controller for managing users
 *
 * @authenticated
 */
class UserController {

    /**
     * Users.index
     *
     * Retrieves all stored users and returns them.
     *
     * @response {
     *  "data": [
     *      {
     *          "id": 1,
     *          "username: "Kale",
     *          "email": "kaleis@delicous.com"
     *      },
     *      {
     *          "id": 2,
     *          "username: "B302",
     *          "email": "user@b302.com"
     *      }
     *  ]
     * }
     */
    public function index(UserRequest $request) {}

    /**
     * Users.update
     *
     * Retrieves a user by it's id and updates it.
     * Returns the updated user.
     *
     * @urlParam id integer required The id of the user
     *
     * @bodyParam username string required The user's new username
     * @bodyParam email string required The user's new email
     *
     * @responseField id The user's id
     * @responseField username The user's username
     * @responseField email The user's email
     */
    public function update(UserRequest $request) {}
}
```