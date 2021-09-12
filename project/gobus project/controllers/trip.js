const trip = require("../models/trip")
const joi = require("joi")



exports.TripDetail = (request,response )=>{
    const knex = request.app.locals.knex
    knex.select('trip.DepTime', 'trip.ArTime', 'bus.code', 'bus.BusClass', 'grades.id', 'AvailSeats', 'BookedSeats')
    .from('go_bus.trip')
    .innerJoin('go_bus.bus', 'go_bus.trip.bus_id', 'go_bus.bus.id') 
    .where('trip.is_delited', 1)
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


const trip1= new trip ("1",Code,DepTime,ArTime,SeatNumber,bus_id)
const Scheme=joi.object({
    id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
    Code : joi.string().not().empty().min(1).max(20).pattern(/[0-9]{1,20}/).required(),
    DepTime :joi.date().required(),
    ArTime  :joi.date().required(),     
    SeatNumber: joi.string().min(1).max(4).required(),
    bus_id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
})

    const joiErrorr= Scheme.validate(trip1)
    if (joiErrorr.error) {

        console.log(joiErrorr.error.details);
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request JOI"
        })
    }


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
    
    const Code = request.body.Code
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

    const trip2= new trip ("1",Code,DepTime,ArTime,SeatNumber,bus_id)
    const Scheme=joi.object({
        id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
        Code : joi.string().not().empty().min(1).max(20).pattern(/[0-9]{1,20}/).required(),
        DepTime :joi.date().required(),//2017-10-20 18:57:53.382
        ArTime  :joi.date().required(),      
        SeatNumber: joi.string().min(1).max(4).required(),
        bus_id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
    })

        const joiErrorr= Scheme.validate(trip2)
        if (joiErrorr.error) {

            console.log(joiErrorr.error.details);
            return response.status(400).json({
                status: "error",
                msg: "400 Bad Request JOI"
            })
        }

    knex('trip')
        .where('Code', '=', trip2.Code)
        .update({
                Code: trip2.Code,
                DepTime: trip2.DepTime,
                ArTime: trip2.ArTime,
                SeatNumber: trip2.SeatNumber,
                bus_id: trip2.bus_id,
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


exports.deleteTrip = (request, response) => {
    const knex = request.app.locals.knex


    knex('trip')
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


exports.restoreTrip = (request, response) => {
    const knex = request.app.locals.knex


    knex('trip')
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