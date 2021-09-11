const BusRouter = require("express").Router()

const BusController = require("../controllers/bus")
//  const MiddelWares = require("../util/middelwares")

BusRouter.get("/",BusController.selectBus)
BusRouter.post("",BusController.addBus)
BusRouter.put("/:id",BusController.updateBus)
BusRouter.delete("/:id",BusController.deleteBus)
BusRouter.patch("/:id",BusController.restoreBus)

module.exports = BusRouter

