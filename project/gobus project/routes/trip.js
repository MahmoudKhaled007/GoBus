const tripRouter = require("express").Router()

const TripController = require("../controllers/trip")
//  const MiddelWares = require("../util/middelwares")

//tripRouter.get("/",TripController.selectTrip)
//tripRouter.post("",TripController.addTrip)
//tripRouter.put("/:id",TripController.updateTrip)
//tripRouter.delete("/:id",TripController.deleteTrip)
//tripRouter.patch("/:id",TripController.restoreTrip)
tripRouter.get("/trip/",TripController.TripDetail)

module.exports = tripRouter

