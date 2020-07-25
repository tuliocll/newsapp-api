"use strict";

class Photo {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      photo: "file|file_ext:png,jpg|file_size:2mb|file_types:image",
    };
  }
}

module.exports = Photo;
