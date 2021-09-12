const ADRouter = require("express").Router()
const ADController = require("../controllers/admin")
const MiddelWares = require("../util/middelwares")
const PasController = require("../controllers/user")

ADRouter.get("/",ADController.selectADs)
ADRouter.post("",ADController.addAD)
ADRouter.post("/login",MiddelWares.checkADAuth,ADController.login)

ADRouter.put("/:id",MiddelWares.checkADAuth,ADController.updateAD)
ADRouter.delete("/:id",MiddelWares.checkADAuth,ADController.deleteAd)
ADRouter.patch("/:id",MiddelWares.checkADAuth,ADController.restoreAD)

PasRouter.post("/user/",MiddelWares.checkADAuth,PasController.addUser)
PasRouter.put("/user/:id",MiddelWares.checkADAuth,PasController.updatePas)
PasRouter.delete("/user/:id",MiddelWares.checkADAuth,PasController.deletePas)
PasRouter.patch("/user/:id",MiddelWares.checkADAuth,PasController.restorePas)




module.exports = ADRouter
const bankerRouter= require("express").Router()
const bankerController= require("../controllers/banker")


const bank_accoutController= require("../controllers/bank-account")
const clientController= require("../controllers/client")

const middleWares = require("../util/middlewares")

//-----------FOR BANK-----
bankerRouter.get("/bankaccount",middleWares.checkBankerAuth, bank_accoutController.selectBankAccount)
bankerRouter.post("/bankaccount",  middleWares.checkBankerAuth,bank_accoutController.addBankAccount)
 bankerRouter.post("/login", bankerController.login)
bankerRouter.put("/bankaccount/:id",middleWares.checkBankerAuth,bank_accoutController.updateBankAccount )
bankerRouter.delete("/bankaccount/:id", middleWares.checkBankerAuth,bank_accoutController.deleteBankAccount)
bankerRouter.patch("/bankaccount/:id", middleWares.checkBankerAuth,bank_accoutController.restoreBankAccount)

//-----------FOR CLIENT-----
bankerRouter.get("/client", middleWares.checkBankerAuth,clientController.selectClient)
bankerRouter.post("/client",  middleWares.checkBankerAuth,clientController.addClient)
// bankerRouter.post("//login", clientController.login)
bankerRouter.put("/client/:id",middleWares.checkBankerAuth,clientController.updateClient )
bankerRouter.delete("/client/:id", middleWares.checkBankerAuth,clientController.deleteClient)
bankerRouter.delete("/client/:id", middleWares.checkBankerAuth,clientController.restoreClient)

module.exports = bankerRouter