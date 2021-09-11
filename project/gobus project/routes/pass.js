const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)
PasRouter.post("",MiddelWares.checkADAuth,PasController.addUser)
PasRouter.post("/login",PasController.login)
PasRouter.put("/:id",PasController.updatePas)
PasRouter.delete("/:id",PasController.deletePas)
PasRouter.patch("/:id",PasController.restorePas)

module.exports = PasRouter