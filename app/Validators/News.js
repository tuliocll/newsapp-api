"use strict";

class News {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required|string",
      description: "required|string",
      likes: "required:number",
      photo_id: "required|number",
    };
  }
}

module.exports = News;
