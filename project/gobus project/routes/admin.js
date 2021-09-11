const ADRouter = require("express").Router()
const ADController = require("../controllers/admin")
const MiddelWares = require("../util/middelwares")

ADRouter.get("/",ADController.selectADs)
ADRouter.post("",MiddelWares.checkADAuth,ADController.addAD)
ADRouter.post("/login",ADController.login)



module.exports = ADRouter