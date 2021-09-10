const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

PasRouter.get("/",PasController.selectUser)
PasRouter.post("",PasController.addUser)
PasRouter.post("/login",PasController.login)

module.exports = PasRouter