class AD {
    constructor(id, code, name, phoneNum, email, password, hashedPassword) {
        this.id = id
        this.code = code
        this.phoneNum = phoneNum
        this.name = name
        this.email = email
        this.password = password
        this.hashedPassword = hashedPassword
    }
}

module.exports = AD