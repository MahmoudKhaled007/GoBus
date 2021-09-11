const ticket=require("../models/ticket")
const joi = require("joi")
const jwt = require('jsonwebtoken');


exports.selectTicket= (request,response)=>{

    const knex = request.app.locals.knex

    knex("ticket")
    .select("Code", "passenger_id", "creditcard_id", "trip_id", "trip_bus_id")
    .then(ticket => {
        response.status(200).json(ticket)
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })

}



exports.addTicket=(request,response)=>{

    const knex = request.app.locals.knex
    const passenger_id = request.body.passenger_id
    const creditcard_id = request.body.creditcard_id
    const trip_id = request.body.trip_id
    const trip_bus_id = request.body.trip_bus_id
    const Code = request.body.Code

if(!passenger_id||!creditcard_id||!trip_id||!trip_bus_id||!Code){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}


const ticket2= new ticket (passenger_id , creditcard_id , trip_id , trip_bus_id , trip_bus_id , Code)


knex("trip")
.insert({
    passenger_id : ticket2.passenger_id,
    creditcard_id : ticket2.creditcard_id,
    trip_id : ticket2.trip_id,
    trip_bus_id : ticket2.trip_bus_id,
    Code : ticket2.Code
})
.then(data=>{
    response.status(201).json({
        status: "ok",
        msg: "Created"

    })


})
.catch(error=>{
    console.log(error);
    response.status(400).json({
        status: "error",
        msg: "400 Bad Request ADD trip"
    })
})

}

exports.updateTicket = (request, response) => {
    const knex = request.app.locals.knex
    const passenger_id = request.body.passenger_id
    const creditcard_id = request.body.creditcard_id
    const trip_id = request.body.trip_id
    const trip_bus_id = request.body.trip_bus_id
    const Code = request.body.Code

if(!passenger_id||!creditcard_id||!trip_id||!trip_bus_id||!Code){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}


const ticket2= new ticket (passenger_id , creditcard_id , trip_id , trip_bus_id , trip_bus_id , Code)

    knex('ticket')
        .where('Code', '=', ticket2.Code)
        .update({
            passenger_id : ticket2.passenger_id,
            creditcard_id : ticket2.creditcard_id,
            trip_id : ticket2.trip_id,
            trip_bus_id : ticket2.trip_bus_id,
            Code : ticket2.Code
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "updated"
            })
        })
        .catch(err => {
            console.log("error");

            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })

}




exports.deleteTicket = (request, response) => {
    const knex = request.app.locals.knex


    knex('ticket')
        .where('Code', '=', request.body.Code)
        .update({
            is_deleted: '1',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "deleted"
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.restoreTTicket = (request, response) => {
    const knex = request.app.locals.knex


    knex('ticket')
        .where('code', '=', request.body.Code)
        .update({
            is_deleted: '0',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "restored"
            })
        })
        .catch(err => {
            console.log("err");
        })
}