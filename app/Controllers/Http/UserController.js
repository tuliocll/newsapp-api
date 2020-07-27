"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const data = request.only(["username", "email", "password"]);

    try {
      const checkExist = await User.findBy("email", data.email);

      if (checkExist) {
        return response.status(400).send({ message: "Email já cadastrado" });
      }

      await User.create(data);

      return response.status(200).send({ message: "Usuario cadastrado" });
    } catch (err) {
      return response
        .status(400)
        .send({ message: "Erro ao cadastrar usuario" });
    }
  }
}

module.exports = UserController;
