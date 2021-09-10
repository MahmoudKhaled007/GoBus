const trip = require("../models/trip")
const joi = require("joi")


exports.selectTrip = (request,response )=>{
    const knex = request.app.locals.knex
knex("trip")
.select("Code","DepTime","ArTime","SeatNumber")
.then(trip=>{
response.status(200).json(trip)
    
})
.catch(error=>{
console.log(error);
response.status(500).json({
    status: "error",
    msg: "500 Internal Server Error"
})
})
}