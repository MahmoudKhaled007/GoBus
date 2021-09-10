const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)
PasRouter.post("",MiddelWares.checkpasAuth,PasController.addUser)
PasRouter.post("/login",PasController.login)
PasRouter.put("/:id", PasController.updatePass)
module.exports = PasRouter