const bcrypt = require("bcrypt")
const pass = require("../models/Passenger")
const jwt = require('jsonwebtoken');


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

    jwt.verify(token,'123456',(error,data)=>{
        if(error){
            return response.status(400).json({
                status: "error",
                msg: "not Auth"
            })
        }
        else{
             console.log("data:: ",data);
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
    
    
        
        const pas = new pass('1', Code, PhoneNum, Name, Email, Password, "")
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



    });


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