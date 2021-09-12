const PasRouter = require("express").Router()
const PasController = require("../controllers/user")
 const MiddelWares = require("../util/middelwares")

 const TripController = require("../controllers/trip")
 const PaymentController = require("../controllers/payment")
 const BusController = require("../controllers/bus")
 const CreditController = require("../controllers/credit")
 const TicketConroller = require("../controllers/ticket")
 
 
 
 //----------USER-------------
 PasRouter.get("/",MiddelWares.checkPasAuth,PasController.selectUser)
 PasRouter.post("/",MiddelWares.checkpasAuth,PasController.addUser)
 PasRouter.put("/:id",MiddelWares.checkPasAuth,PasController.updatePas)
 PasRouter.delete("/:id",MiddelWares.checkPasAuth,PasController.deletePas)
 PasRouter.patch("/:id",MiddelWares.checkPasAuth,PasController.restorePas)
 
 //----------PAYMENT-------------
 
  
 PasRouter.post("/payment/",MiddelWares.checkPasAuth,PaymentController.addPayment)
 PasRouter.put("/payment/:id",MiddelWares.checkPasAuth,PaymentController.updatePayment)
 
 
 
 

 
 //----------CREDIT-------------
 
 
 PasRouter.post("/credit",MiddelWares.checkPasAuth,CreditController.addCredit)
 PasRouter.put("/credit/:id",MiddelWares.checkPasAuth,CreditController.updateCredit)
 
 PasRouter.delete("/credit/:id",MiddelWares.checkPasAuth,CreditController.deleteCredit)
 
 //----------TICKET-------------
 
 
 PasRouter.post("/ticket",MiddelWares.checkPasAuth,TicketConroller.addTicket)
 PasRouter.put("/ticket/:id",MiddelWares.checkPasAuth,TicketConroller.updateTicket)
 PasRouter.delete("/ticket/:id",MiddelWares.checkPasAuth,TicketConroller.deleteTicket)
 
 
module.exports = PasRouter