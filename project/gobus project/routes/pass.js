const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)

PasRouter.post("/",MiddelWares.checkpasAuth,PasController.addUser)

PasRouter.post("/login",PasController.login)

PasRouter.put("/:id",MiddelWares.checkpasAuth,PasController.updatePas)

PasRouter.delete("/:id",MiddelWares.checkpasAuth,PasController.deletePas)

PasRouter.patch("/:id",MiddelWares.checkADAuth,PasController.restorePas)

module.exports = PasRouter