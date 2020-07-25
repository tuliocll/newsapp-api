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

Route.post("users", "UserController.store").validator("User");

Route.get("news/:id/like", "NewsController.like");

Route.resource("news", "NewsController")
  .validator(new Map([[["store"], ["News"]]]))
  .middleware(["auth"]);
Route.resource("photos", "PhotoController").validator(
  new Map([[["store"], ["Photo"]]])
);
