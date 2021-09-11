const PaymentRauter = require("express").Router()
const PaymentController = require("../controllers/payment")
// const MiddelWares = require("../util/middelwares")

PaymentRauter.get("/:id",PaymentController.selectpayment)

PaymentRauter.post("/",PaymentController.addpayment)

PaymentRauter.put("/:idd",PaymentController.updatepayment)



module.exports = PaymentRauter