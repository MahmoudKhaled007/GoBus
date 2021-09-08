const bcrypt = require("bcrypt")
const AD = require("../models/admin")
const jwt = require("jsonwebtoken");
const joi = require("joi")
exports.selectADs = (request, response) => {
    const knex = request.app.locals.knex
    knex("ads")
        .select("id", "Code", "Name", "PhoneNum", "Email")
        .then(ADs => {
            response.status(200).json(ADs)
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.addAD = (request, response) => {
    const knex = request.app.locals.knex

    const Name = request.body.Name
    const Code = request.body.Code
    const PhoneNum = request.body.PhoneNum
    const Email = request.body.Email
    const Password = request.body.Password

    if (!Name || !Code || !PhoneNum || !Email || !Password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }



    
        const ad = new AD('1', Code, PhoneNum, Name, Email, Password, "has")
        const adSchema=joi.object({
         id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required(),
          code:joi.string().not().empty().min(2).max(50).required(),
          PhoneNum:joi.string().pattern(/[0-9]{11}/).required(),
          Name:joi.string().not().empty().min(3).max(50).pattern(/[a-z A-Z]{3,50}/).required(),
          Email:joi.string().min().max(60).required(),
          Password:joi.string().min(6).max(20).required(),
            hashedPassword:joi.string().min(1).max(200).required(),
        })
        const joiError=adSchema.validate(ad);
        if(joiError.error){
            console.log("joiError");
            console.log(joiError.error.details);
            return response.status(400).json({
status:"error",
msg:"400 bad Request"

            })
        }
        bcrypt.hash(Password, 10, function (err, hash) {
            if (err) {
                console.log(err);
            }
        ad.hashedPassword = hash
        knex("ads")
            .insert({
                Name: ad.Name,
                Code: ad.Code,
                PhoneNum: ad.PhoneNum,
                Email: ad.Email,
                Password: ad.hashedPassword,
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

    knex("ads")
        .select('Email', 'Password')
        .limit(1)
        .where('Email', '=', Email)
        .then(AD => {
            console.log(AD);
            if (AD[0] != null) {
                bcrypt.compare(Password, AD[0].Password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    
                    if (result) {
                        const token = jwt.sign({
                            userEmail:AD[0].Email,
                            userType:'AD'
                        },"123456", {})
                        response.status(200).json({
                            token : token,
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