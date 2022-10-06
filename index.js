const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const employeeRouter = require("./routes/employeeECMRouter")
const bankRouter = require("./routes/bankECMRouter")
const attendenceRouter = require("./routes/attendenceECMRouter")
const clientRouter = require("./routes/clientsECMRouter")
const inventoryRouter = require("./routes/inventoryECMRouter")
const projectRouter = require("./routes/projectECMRouter")
const requisitionRouter = require("./routes/requisitionECMRouter")
const supplierRouter = require("./routes/supplierECMRouter")
const userRouter = require("./routes/userECMRouters")
const accountRouter = require("./routes/accountECMRouter")


const multer = require("multer");

require("dotenv").config();
const PORT = process.env.PORT || 5001;

// app init
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());
app.use(express.static(__dirname + "/template"));

const dbUrl = `mongodb+srv://ecm-admin:mDZRrdSXzHPlEua5@cluster0.ht6vrw8.mongodb.net/?retryWrites=true&w=majority`;
// database connection
mongoose
  .connect(dbUrl)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application router

app.use("/ecm/employee", employeeRouter);
app.use("/ecm/bank", bankRouter);
app.use("/ecm/attendence", attendenceRouter);
app.use("/ecm/client", clientRouter);
app.use("/ecm/inventory", inventoryRouter);
app.use("/ecm/project", projectRouter);
app.use("/ecm/requisition", requisitionRouter);
app.use("/ecm/supplier", supplierRouter);
app.use("/ecm/user", userRouter);
app.use("/ecm/account", accountRouter);

// Home
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/template/home.html"));
});

// API DOCS
app.get("/api/v1/docs", async (req, res) => {
  res.sendFile(path.join(__dirname + "/template/docs.html"));
});

// error Handle
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  } else {
    if (err instanceof multer.MulterError) {
      res.status(500).send(err.message);
    } else {
      res.status(500).json({ err: err });
    }
  }
};

app.use(errorHandler);

// start app
app.listen(PORT, () => {
  console.log("Listing port:", PORT);
});
