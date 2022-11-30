import express from 'express';
import { UrlsController } from '../../controller/urls.controller';
export const urlRoutes: express.Router = express.Router();

const urlController = UrlsController.createInstance();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateShortUrl:
 *       properties:
 *         url:
 *           type: string
 *     ShortUrlCreationSuccessResponse:
 *       properties:
 *         status:
 *           type: boolean
 *         message:
 *           type: string
 *         result:
 *           $ref: "#/components/schemas/ShortUrlResponseItem"
 *     ShortUrlResponseItem:
 *       properties:
 *         originalUrl:
 *           type: string
 *         shorternUrl:
 *           type: string
 *         createdAt:
 *           type: Date
 *         id:
 *           type: number
 *
 */

/**
 * Create Short Url
 */

/**
 * @swagger
 *
 * /tier.app/short-url:
 *   post:
 *     tags:
 *       - short-url
 *     description: Create new short url
 *     produces:
 *       - application/json
 *     requestBody:
 *        description: "JSON Payload"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateShortUrl"
 *     responses:
 *       200:
 *         description: Result with Object of ShortUrl
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ShortUrlCreationSuccessResponse'
 *       401:
 *         description: Unauthorised
 *       420:
 *         description: Method Failure
 */
urlRoutes.route('/short-url').post(urlController.create);

/**
 * Fetch Original Url from short url
 */

/**
 * @swagger
 *
 * /tier.app/:shortUrl:
 *   get:
 *     tags:
 *       - short-url
 *     description: Redirect to original url when short url is matched
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "shortUrl"
 *         in: "path"
 *         description: "short url"
 *     responses:
 *       200:
 *         description: Redirects to original url
 *       404:
 *         description: Not Found
 */
urlRoutes.route('/:shortUrl').get(urlController.fetch);