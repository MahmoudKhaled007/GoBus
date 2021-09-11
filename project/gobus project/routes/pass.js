const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)

PasRouter.post("/user",MiddelWares.checkpasAuth,PasController.addUser)
PasRouter.post("/admin",MiddelWares.checkADAuth,PasController.addUser)

PasRouter.post("/login",PasController.login)

PasRouter.put("/user/:id",MiddelWares.checkpasAuth,PasController.updatePas)
PasRouter.put("/admin/:id",MiddelWares.checkADAuth,PasController.updatePas)

PasRouter.delete("/user/:id",MiddelWares.checkpasAuth,PasController.deletePas)
PasRouter.delete("/admin/:id",MiddelWares.checkADAuth,PasController.deletePas)

PasRouter.patch("/user/:id",MiddelWares.checkADAuth,PasController.restorePas)
PasRouter.patch("/admin/:id",MiddelWares.checkADAuth,PasController.restorePas)

module.exports = PasRouter