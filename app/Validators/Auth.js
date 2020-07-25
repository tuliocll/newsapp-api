"use strict";

class Auth {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }
}

module.exports = Auth;
