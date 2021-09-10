const CreditRouter = require("express").Router()
const CreditController = require("../controllers/credit")
// const MiddelWares = require("../util/middelwares")


CreditRouter.post("",CreditController.addCredit)
CreditRouter.put("/:id",CreditController.updateCredit)

CreditRouter.delete("/:id",CreditController.deleteCredit)
CreditRouter.patch("/:id",CreditController.restoreCredit)


module.exports = CreditRouter