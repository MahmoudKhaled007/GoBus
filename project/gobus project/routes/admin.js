const ADRouter = require("express").Router()
const ADController = require("../controllers/admin")
const MiddelWares = require("../util/middelwares")

ADRouter.get("/",ADController.selectADs)
ADRouter.post("",ADController.addAD)
ADRouter.post("/login",MiddelWares.checkADAuth,ADController.login)

ADRouter.put("/:id",MiddelWares.checkADAuth,ADController.updateAD)
ADRouter.delete("/:id",MiddelWares.checkADAuth,ADController.deleteAd)
ADRouter.patch("/:id",MiddelWares.checkADAuth,ADController.restoreAD)




module.exports = ADRouter