"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NewsSchema extends Schema {
  up() {
    this.create("news", (table) => {
      table.increments();
      table.string("title");
      table.string("description");
      table.integer("likes");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("photo_id").unsigned().references("id").inTable("photos");
      table.timestamps();
    });
  }

  down() {
    this.drop("news");
  }
}

module.exports = NewsSchema;
