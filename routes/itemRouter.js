const express = require("express");
const Item = require("../model/item");
const cors = require("./cors");

const itemRouter = express.Router();

/** without params---------------------------------- */
itemRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Item.find()
      .then((items) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(items);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    Item.create(req.body)
      .then((item) => {
        console.log("Item Created ", item);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(item);
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /items");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Item.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

/** with params---------------------------------- */

itemRouter
  .route("/:itemId")
  .get(cors.cors, (req, res, next) => {
    Item.findById(req.params.itemId)
      .then((item) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(item);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /items");
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true })
      .then((item) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(item);
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Item.findByIdAndDelete(req.params.itemId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = itemRouter;
