const bcrypt = require("bcrypt")
const bus = require("../models/bus")
const jwt = require('jsonwebtoken');
const joi = require("joi")


exports.selectBus = (request, response) => {
    const knex = request.app.locals.knex
    knex("bus")
        .select("id", "Code", "BusClass", "BookedSeats", "AvailSeats")
        .then(bus => {
            response.status(200).json(bus)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addBus = (request, response) => {
    const knex = request.app.locals.knex

    const Code = request.body.Code
    const BusClass = request.body.BusClass
    const BookedSeats = request.body.BookedSeats
    const AvailSeats = request.body.AvailSeats
    
    

    if (!Code || !BusClass || !BookedSeats || !AvailSeats) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }
    const buss = new bus('1', Code, BusClass, BookedSeats, AvailSeats)

    const adSchema=joi.object({
        id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
        Code:joi.string().not().empty().min(1).max(50).required(),
        BusClass:joi.string().not().empty().min(3).max(50).pattern(/[a-z A-Z]{3,50}/).required(),
        BookedSeats:joi.string().min(1).max(60).required(),
        AvailSeats:joi.string().min(1).max(60).required(),

       })
       const joiError=adSchema.validate(buss);
       if(joiError.error){
           console.log("joiError");
           console.log(joiError.error.details);
           return response.status(400).json({
           status:"error",
           msg:"400 bad Request"

           })
       }
    
             //console.log("data:: ",data);
            //bcrypt.hash(Password, 10,(err, hash) =>{
            //if(error){
              //  console.log(error);
                //return response.status(500).json({
                  //  status: "error",
                    //msg: "500 Internal Server Error"
            //})
        //}
        //}) 
   
    
    
        
        //pas.hashedPassword = hash
        knex("bus")
            .insert({
                Code: buss.Code,
                BookedSeats: buss.BookedSeats,

                BusClass: buss.BusClass,
                BookedSeats: buss.BookedSeats,
            })
            .then(data => {
                response.status(201).json({
                    status: "ok",
                    msg: "Created"
                })
            })
            .catch(error => {
                console.log(error);
                response.status(500).json({
                    status: "error",
                    msg: "500 Internal Server Error"
                })
            })



   // });

}
        

exports.login = (request, response) => {

    const knex = request.app.locals.knex

    const Email = request.body.Email
    const Password = request.body.Password
    if (!Email || !Password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    knex("passenger")
        .select('Email', 'Password')
        .limit(1)
        .where('Email', '=', Email)
        .then(pas => {
            if (pas[0] == null) {
                return response.status(401).json({
                    status: "error",
                    msg: "invalid email"
                })
            } else {
                bcrypt.compare(password, pas[0].password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        const token = jwt.sign({
                            passCode: pas[0].code,
                            usertype: "pass"
                        }, '12345', {})

                        return response.status(200).json({
                            status: "ok",
                            msg: "Login",
                            token
                        })
                    } else {
                        return response.status(401).json({
                            status: "error",
                            msg: "invalid password"
                        })
                    }
                })

            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}