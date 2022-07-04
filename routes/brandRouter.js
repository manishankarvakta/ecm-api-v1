/**
 * brands API
 * 1. get all brands
 * 2. get Brand by id
 * 3. get Brand by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Brand = require("../models/brandModel");
const checklogin = require("../middlewares/checkLogin");

const brandRouter = express.Router();

// GET ALL brands
brandRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const brands = await Brand.find({ status: "active" });
    res.send(brands);
    // // res.send('removed');
    console.log(brands);
  })
);

// GET ONE brands
brandRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const brands = await Brand.find({ _id: id, status: "active" });
    res.send(brands[0]);
    // // res.send('removed');
    console.log(brands);
  })
);

// CREATE ONE Brand
brandRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newBrand = new Brand(req.body);
    try {
      await newBrand.save();
      res.status(200).json({
        message: "Brand is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI brands
brandRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Brand.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "brands are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Brand
brandRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Brand.updateOne({ _id: id }, { $set: update })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      console.error(error);
    }
  })
);

// DELETE ONE Brand
brandRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Brand.deleteOne({ _id: id })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = brandRouter;
