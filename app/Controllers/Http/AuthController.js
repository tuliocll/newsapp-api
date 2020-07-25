"use strict";

const User = use("App/Models/User");

class AuthController {
  async store({ response, request, auth }) {
    const data = request.only(["email", "password"]);

    const { email, password } = data;

    try {
      const token = await auth.attempt(email, password);

      return response.status(200).send(token);
    } catch (err) {
      return response
        .status(400)
        .send({ message: "Usuario ou senha invalidos" });
    }
  }
}

module.exports = AuthController;
