const bcrypt = require("bcrypt")
const passenger = require("../models/passenger")

exports.selectpassenger = (request, response) => {
    const knex = request.app.locals.knex
    knex("passenger")
        .select("id", "code", "name", "phoneNum", "email")
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

exports.addpassenger = (request, response) => {
    const knex = request.app.locals.knex

    const name = request.body.name
    const code = request.body.code
    const phoneNum = request.body.phoneNum
    const email = request.body.email
    const password = request.body.password

    if (!name || !code || !phoneNum || !email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }



    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        }
        const Passenger = new passenger('1', code, phoneNum, name, email, password, hash)

        knex("passenger")
            .insert({
                name: Passenger.name,
                code: Passenger.code,
                phoneNum: Passenger.phoneNum,
                email: Passenger.email,
                password: Passenger.hashedPassword,
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

    knex("passenger")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(passenger => {
            console.log(passenger);
            if (passenger[0] != null) {
                bcrypt.compare(password, passenger[0].password, (error, result) => {
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