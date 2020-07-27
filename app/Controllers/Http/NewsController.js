"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const News = use("App/Models/News");

class NewsController {
  /**
   * Show a list of all news.
   * GET news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    try {
      const { page = 1 } = request.get();
      const news = await News.query().with("user").paginate(page, 10);

      return response.status(200).send(news);
    } catch (err) {
      console.log(err);
      return response.status(400).send({ message: "Erro ao buscar noticias" });
    }
  }

  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const data = request.only(["title", "description", "likes", "photo_id"]);

      await News.create({ ...data, user_id: auth.user.id });

      return response
        .status(200)
        .send({ message: "Noticia cadastrada com sucesso" });
    } catch (err) {
      return response
        .status(400)
        .send({ message: "Erro ao cadastrar noticia" });
    }
  }

  /**
   * Display a single news.
   * GET news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const { id } = params;

      const post = await News.query().with("user").where("id", id).first();

      return response.status(200).send(post);
    } catch (err) {
      return response
        .status(400)
        .send({ message: "Erro ao cadastrar noticia" });
    }
  }

  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async like({ response, params }) {
    try {
      const { id } = params;

      const news = await News.findOrFail(id);

      news.likes = news.likes + 1;

      await news.save();

      return response.status(200).send(news);
    } catch (err) {
      return response.status(400).send({ message: "Erro ao dar like" });
    }
  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = NewsController;
