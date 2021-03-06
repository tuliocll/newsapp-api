"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhotoSchema extends Schema {
  up() {
    this.create("photos", (table) => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("photos");
  }
}

module.exports = PhotoSchema;
