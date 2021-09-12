const TicketRouter= require("express").Router()
const TicketConroller = require("../controllers/ticket")

// TicketRouter.get("/",TicketConroller.selectTicket)
// TicketRouter.post("",TicketConroller.addTicket)
// TicketRouter.put("/:id",TicketConroller.updateTicket)
// TicketRouter.delete("/:id",TicketConroller.deleteTicket)
// TicketRouter.patch("/:id",TicketConroller.restoreTTicket)

TicketRouter.get("/",TicketConroller.selectMyTicket)



module.exports= TicketRouter