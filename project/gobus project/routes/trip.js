const tripRouter = require("express").Router()

const TripController = require("../controllers/trip")
//  const MiddelWares = require("../util/middelwares")

tripRouter.get("/",TripController.selectTrip)
tripRouter.post("",TripController.addTrip)
tripRouter.put("/update",TripController.updateTrip)

module.exports = tripRouter