const PaymentRauter = require("express").Router()
const PaymentController = require("../controllers/payment")

PaymentRauter.get("/",PaymentController.selectPayment)

PaymentRauter.post("/",PaymentController.addPayment)

PaymentRauter.put("/:id",PaymentController.updatePayment)


module.exports = PaymentRauter