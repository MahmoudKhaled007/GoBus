const bcrypt = require("bcrypt")
const pass = require("../models/Passenger")
const jwt = require('jsonwebtoken');
const joi = require("joi")


exports.selectUser = (request, response) => {
    const knex = request.app.locals.knex
    knex("passenger")
        .select("id", "Code", "Name", "PhoneNum", "Email")
        .then(passenger => {
            response.status(200).json(passenger)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addUser = (request, response) => {
    const knex = request.app.locals.knex

    const Name = request.body.Name
    const Code = request.body.Code
    const PhoneNum = request.body.PhoneNum
    const Email = request.body.Email
    const Password = request.body.Password
    const token = request.body.token

    if (!Name || !Code || !PhoneNum || !Email || !Password || !token) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }
    const pas = new pass('1', Code, PhoneNum, Name, Email, Password, "2345")

    const adSchema=joi.object({
        id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
         code:joi.string().not().empty().min(2).max(50).required(),
         PhoneNum:joi.string().pattern(/[0-9]{11}/).required(),
         Name:joi.string().not().empty().min(3).max(50).pattern(/[a-z A-Z]{3,50}/).required(),
         Email:joi.string().min().max(60).required(),
         Password:joi.string().min(6).max(20).required(),
           hashedPassword:joi.string().min(1).max(200).required(),
       })
       const joiError=adSchema.validate(pas);
       if(joiError.error){
           console.log("joiError");
           console.log(joiError.error.details);
           return response.status(400).json({
status:"error",
msg:"400 bad Request"

           })
       }
    
             //console.log("data:: ",data);
            bcrypt.hash(Password, 10,(err, hash) =>{
            if(error){
                console.log(error);
                return response.status(500).json({
                    status: "error",
                    msg: "500 Internal Server Error"
            })
        }
        }) 
   }
    
    
        
        pas.hashedPassword = hash
        knex("passenger")
            .insert({
                Code: pas.Code,
                Email: pas.Email,

                Name: pas.Name,
                Password: pas.hashedPassword,
                PhoneNum: pas.PhoneNum,
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
            console.log(pas);
            if (pas[0] != null) {
                bcrypt.compare(Password, pas[0].Password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        response.status(200).json({
                            status: "ok",
                            msg: "login"
                        })
                    } else {
                        response.status(401).json({
                            status: "error",
                            msg: "invalid password"
                        })
                    }
                })

            } else {
                response.status(401).json({
                    status: "error",
                    msg: "401 not Auth"
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