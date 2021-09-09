const busRouter = require("express").Router()

const busController = require("../controllers/bus")

busRouter.get("/",busController.selectBus)
busRouter.post("/",busController.addBus)

module.exports = busRouter