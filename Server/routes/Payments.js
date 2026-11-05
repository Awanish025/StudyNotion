const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail,
} = require("../controller/Payment");

const { auth } = require("../middelwares/auth");

router.post("/capturePayment", auth, capturePayment);
router.post("/verifySignature", auth, verifySignature);
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);

module.exports = router;
