const ADRouter = require("express").Router()
const ADController = require("../controllers/admin")


ADRouter.get("/",ADController.selectADs)
ADRouter.post("",ADController.addAD)
ADRouter.post("/login",ADController.login)



module.exports = ADRouter