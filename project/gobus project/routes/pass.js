const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)
<<<<<<< Updated upstream
PasRouter.post("",MiddelWares.checkADAuth,PasController.addUser)
=======
PasRouter.post("",MiddelWares.checkpasAuth,PasController.addUser)
>>>>>>> Stashed changes
PasRouter.post("/login",PasController.login)

module.exports = PasRouter