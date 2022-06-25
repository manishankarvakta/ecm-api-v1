/**
 * InventoryCounts API
 * 1. get all InventoryCounts
 * 2. get InventoryCount by id
 * 3. get InventoryCount by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const InventoryCount = require("../models/inventoryCountModel");
const checklogin = require("../middlewares/checkLogin");

const inventoryCountRouter = express.Router();

// GET ALL InventoryCounts
inventoryCountRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const InventoryCounts = await InventoryCount.find({ status: "active" });
    res.send(InventoryCounts);
    // // res.send('removed');
    console.log(InventoryCounts);
  })
);

// GET ONE InventoryCounts
inventoryCountRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const InventoryCounts = await InventoryCount.find({
      _id: id,
      status: "active",
    });
    res.send(InventoryCounts);
    // // res.send('removed');
    console.log(InventoryCounts);
  })
);

// CREATE ONE InventoryCount
inventoryCountRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const InewnventoryCount = new InventoryCount(req.body);
    try {
      await InewnventoryCount.save();
      res.status(200).json({
        message: "InventoryCount is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI InventoryCounts
inventoryCountRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await InventoryCount.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "InventoryCounts are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE InventoryCount
inventoryCountRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await InventoryCount.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE InventoryCount
inventoryCountRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await InventoryCount.deleteOne({ _id: id })
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

module.exports = inventoryCountRouter;