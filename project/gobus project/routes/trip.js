const tripRouter = require("express").Router()
const tripController= require("../controllers/trip")
tripRouter.get("/",tripController.selectTrip)
tripRouter.post("/",tripController.addBus)

module.exports=tripRouter