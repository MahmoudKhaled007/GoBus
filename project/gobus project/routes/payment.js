const PaymentRauter = require("express").Router()
const PaymentController = require("../controllers/payment")

PaymentRauter.get("/",PaymentController.selectPayment)

PaymentRauter.post("/",PaymentController.addPayment)

<<<<<<< HEAD
PaymentRauter.put("/:idd",PaymentController.updatepayment)
tripRouter.delete("/:id",PaymentController.deletepay)
tripRouter.patch("/:id",PaymentController.restorepay)
=======
PaymentRauter.put("/:id",PaymentController.updatePayment)

>>>>>>> 9082865819ea802d73d31cd15a31186bf47efcd4


module.exports = PaymentRauter