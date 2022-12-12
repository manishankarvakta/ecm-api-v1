const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const productRouter = express.Router();

//GET ALL products
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({}).populate("category");
    console.log(product);
    res.send(product);
    // // res.send('removed');
  })
);

// GET product by id
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.find({ _id: id });
    res.send(product[0]);
  })
);

// CREATE ONE Product
productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json({
        message: "Product is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE Product
productRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await Product.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE BANK
productRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Product.deleteOne({ _id: id })
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

module.exports = productRouter;
