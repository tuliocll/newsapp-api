"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("sessions", "AuthController.store").validator("Auth");

Route.get("/", ({ response }) => response.send("Tutorial Login, Tulio Calil"));

Route.post("users", "UserController.store").validator("User");

Route.resource("news", "NewsController")
  .validator(new Map([[["store"], ["News"]]]))
  .middleware("auth");

Route.resource("photos", "PhotoController").validator(
  new Map([[["store"], ["Photo"]]])
);
