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

exports.addTrip = (request,response)=>{
    const knex = request.app.locals.knex

    const Code= request.body.Code
    const DepTime = request.body.DepTime
    const ArTime = request.body.ArTime
    const SeatNumber = request.body.SeatNumber
    const bus_id = request.body.bus_id

if(!Code||!DepTime||!ArTime||!SeatNumber||!bus_id){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}


const trip1= new trip ("",Code,DepTime,ArTime,SeatNumber,bus_id)


knex("trip")
.insert({
     Code : trip1.Code,
     DepTime : trip1.DepTime,
     ArTime : trip1.ArTime,
     SeatNumber : trip1.SeatNumber,
     bus_id : trip1.bus_id
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

exports.updateTrip = (request, response) => {
    const knex = request.app.locals.knex
    const trip2= new trip ("",Code,DepTime,ArTime,SeatNumber,bus_id)

    const Code= request.body.Code
    const DepTime = request.body.DepTime
    const ArTime = request.body.ArTime
    const SeatNumber = request.body.SeatNumber
    const bus_id = request.body.bus_id

if(!Code||!DepTime||!ArTime||!SeatNumber||!bus_id){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}



    knex('trip')
    .update({
         Code: trip2.Code,
         DepTime : trip2.DepTime,
         ArTime : trip2.ArTime,
         SeatNumber : trip2.SeatNumber,
        bus_id : trip2.bus_id,
    })
    .where('Code', '=', trip2.Code)
        .then(data => {
        response.status(200).json({
            status: "ok",
            msg: "updated"
        })
    })
    .catch(err => {
        response.status(500).json(notes)({
            status:"erorr",
            msg:"server erorr"
        })        })

}


exports.deleteTrip = (request, response) => {
    const knex = request.app.locals.knex


    knex('trip')
        .where('id', '=', request.params.id)
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
            console.log("error");
        })
}

exports.restoreTrip = (request, response) => {
    const knex = request.app.locals.knex


    knex('trip')
        .where('id', '=', request.params.id)
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
