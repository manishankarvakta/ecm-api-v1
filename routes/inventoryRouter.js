const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Inventory = require("../models/inventory");

const inventoryRouter = express.Router();

inventoryRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const inventories = await Inventory.find();
        res.send(inventories);
        // // res.send('removed');
        console.log(inventories);
    })
);


// GET ONE inventories
inventoryRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const inventories = await Inventory.find({ _id: id, status: "active" });
        res.send(inventories[0]);
        // // res.send('removed');
        console.log(inventories);
    })
);

// CREATE ONE Inventory
inventoryRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newInventory = new Inventory(req.body);
        try {
            await newInventory.save();
            res.status(200).json({
                message: "Inventory is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// CREATE MULTI inventories
inventoryRouter.post(
    "/all",
    expressAsyncHandler(async (req, res) => {
        await Inventory.insertMany(req.body, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({
                    message: "inventories are created Successfully",
                });
            }
        });
    })
);

// UPDATE ONE Inventory
inventoryRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        try {
            await Inventory.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Inventory
inventoryRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Inventory.deleteOne({ _id: id })
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



module.exports = inventoryRouter;