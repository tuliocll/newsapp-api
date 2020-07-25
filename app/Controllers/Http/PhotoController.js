"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Photo = use("App/Models/Photo");
const Helpers = use("Helpers");

class PhotoController {
  /**
   * Show a list of all photos.
   * GET photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new photo.
   * POST photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const postPhoto = request.file("photo", {
        types: ["image"],
        size: "2mb",
      });

      const name = `newsapp-${new Date().getTime()}.${postPhoto.subtype}`;

      await postPhoto.move(Helpers.tmpPath("uploads"), {
        name: name,
      });

      if (!postPhoto.moved()) {
        return response
          .status(400)
          .send({ message: "Erro ao processar imagem1" });
      }

      const photo = await Photo.create({ name });

      return photo;
    } catch (err) {
      console.log(err);
      return response.status(400).send({ message: "Erro ao processar imagem" });
    }
  }

  /**
   * Display a single photo.
   * GET photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const photo = await Photo.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`uploads/${photo.name}`));
  }

  /**
   * Update photo details.
   * PUT or PATCH photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a photo with id.
   * DELETE photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PhotoController;
