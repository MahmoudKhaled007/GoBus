const tripRouter = require("express").Router()

const TripController = require("../controllers/trip")

<<<<<<< HEAD
//tripRouter.get("/",TripController.selectTrip)
//tripRouter.post("",TripController.addTrip)
//tripRouter.put("/:id",TripController.updateTrip)
//tripRouter.delete("/:id",TripController.deleteTrip)
//tripRouter.patch("/:id",TripController.restoreTrip)
tripRouter.get("/",TripController.TripDetail)
=======
>>>>>>> dad160502f7d5832974fc3c7a00d7a296ea1fecf

module.exports = tripRouter

