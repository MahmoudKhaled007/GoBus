const payment=require("../models/payment")
const joi = require("joi")
const jwt = require('jsonwebtoken')


exports.selectPayment= (request,response)=>{

    const knex = request.app.locals.knex

    knex("payment")
    .select("id", "PaymentType")
    .then(payment => {
        response.status(200).json(payment)
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })

}


exports.addPayment=(request,response)=>{

    const knex = request.app.locals.knex

    const id = request.body.id
    const PaymentType = request.body.PaymentType
 

if(!id||!PaymentType){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}


const pay= new payment (id , PaymentType)
const Scheme=joi.object({
    id : joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
    PaymentType :joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{1,20}/).required(),      

})

const joiErrorr= Scheme.validate(pay)
if (joiErrorr.error) {

    console.log(joiErrorr.error.details);
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request JOI"
    })
}

knex("payment")
.insert({
    id : pay.id,
    PaymentType : pay.PaymentType
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
        msg: "400 Bad Request ADD payment"
    })
})

}






exports.updatePayment = (request, response) => {
    const knex = request.app.locals.knex

    const id = request.body.id
    const PaymentType = request.body.PaymentType
 
if(!id||!Code){
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request"
    })

}


const pay= new payment (id,PaymentType)
const Scheme=joi.object({
    id : joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
    PaymentType :joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{1,20}/).required(),      

})

const joiErrorr= Scheme.validate(pay)
if (joiErrorr.error) {

    console.log(joiErrorr.error.details);
    return response.status(400).json({
        status: "error",
        msg: "400 Bad Request JOI"
    })
}

    knex('payment')
        .where('Code', '=', pay.id)
        .update({
            id : pay.id,
            creditcard_id : pay.PaymentTypet,
            
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


    knex('payment')
        .where('id', '=', request.body.Code)
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


exports.restorepay = (request, response) => {
    const knex = request.app.locals.knex


    knex('payment')
        .where('id', '=', request.body.Code)
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