const busRouter = require("express").Router()

const busController = require("../controllers/bus")
//const middelwares=require("../util/middelwares")
busRouter.get("/",busController.selectBus)
busRouter.post("/",busController.addBus)
//busRouter.post("/login",busController.login)

module.exports = busRouter