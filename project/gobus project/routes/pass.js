const PasRouter = require("express").Router()

const PasController = require("../controllers/user")
const middelwares=require("../util/middelwares")
PasRouter.get("/",PasController.selectUser)
PasRouter.post("/",middelwares.checkADAuth,PasController.addUser)
PasRouter.post("/login",PasController.login)

module.exports = PasRouter