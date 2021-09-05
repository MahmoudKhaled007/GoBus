const bcrypt = require("bcrypt")
const AD = require("../models/admin")

exports.selectADs = (request, response) => {
    const knex = request.app.locals.knex
    knex("ADs")
        .select("id", "code", "name", "phone", "email")
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

    const name = request.body.name
    const code = request.body.code
    const phone = request.body.phone
    const email = request.body.email
    const password = request.body.password

    if (!name || !code || !phone || !email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }



    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        }
        const ad = new AD('1', code, phone, name, email, password, hash)

        knex("ADs")
            .insert({
                name: ad.name,
                code: ad.code,
                phone: ad.phone,
                email: ad.email,
                password: ad.hashedPassword,
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

    const email = request.body.email
    const password = request.body.password
    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    knex("ADs")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(AD => {
            console.log(AD);
            if (AD[0] != null) {
                bcrypt.compare(password, AD[0].password, (error, result) => {
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