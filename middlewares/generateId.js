const { format, startOfDay, endOfDay } = require("date-fns");
const Grn = require("../models/grnModel");
const Purchase = require("../models/purchaseModel");
const Rtv = require("../models/rtvModel");
const Sale = require("../models/saleModel");
const Tpn = require("../models/tpnModel");

// Generate POS Sales ID
const generatePosId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Sale.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-POS-" + date + "-" + current;
  console.log(newId);
  req.body.invoiceId = newId;
  next();
};

// Generate PO Id
const generatePoId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Purchase.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-PO-" + date + "-" + current;
  console.log(newId);
  req.body.poNo = newId;
  next();
};

// Generate Grn Id
const generateGrnId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Grn.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-GRN-" + date + "-" + current;
  console.log(newId);
  req.body.grnNo = newId;
  console.log(newId);
  next();
};

// Generate Grn Id
const generateRtvId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Rtv.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-RTV-" + date + "-" + current;
  console.log(newId);
  req.body.rtvNo = newId;
  next();
};

// Generate Grn Id
const generateTpnId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Tpn.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-TPN-" + date + "-" + current;
  console.log(newId);
  req.body.tpnNo = newId;
  next();
};

module.exports = {
  generatePosId,
  generatePoId,
  generateGrnId,
  generateRtvId,
  generateTpnId,
};
