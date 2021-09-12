const PaymentRauter = require("express").Router()
const PaymentController = require("../controllers/payment")
// const MiddelWares = require("../util/middelwares")

PaymentRauter.get("/:id",PaymentController.selectpayment)

PaymentRauter.post("/",PaymentController.addpayment)

PaymentRauter.put("/:idd",PaymentController.updatepayment)
tripRouter.delete("/:id",PaymentController.deletepay)
tripRouter.patch("/:id",PaymentController.restorepay)


module.exports = PaymentRauter