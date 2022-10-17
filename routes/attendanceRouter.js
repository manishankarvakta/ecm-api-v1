const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Attendance = require("../models/attendance");

const attendanceRouter = express.Router();

attendanceRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const attendance = await Attendance.find();
        res.send(attendance);
        // // res.send('removed');
        console.log(attendance);
    })
);

// GET USER BY ID
attendanceRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const attendance = await Attendance.find({ _id: id }).select({
            project: 1,
            date: 1,
            inTime: 1,
            outTime: 1,
            eid: 1,
            status: 1,
        });
        res.send(attendance[0]);
    })
);

// CREATE ONE Attendance
attendanceRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newAttendance = new Attendance(req.body);
        try {
            await newAttendance.save();
            res.status(200).json({
                message: "Attendance is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);


// UPDATE ONE Attendance
attendanceRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Attendance.updateOne({ _id: id }, { $set: update })
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

attendanceRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Attendance.deleteOne({ _id: id })
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

module.exports = attendanceRouter;