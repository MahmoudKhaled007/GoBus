// const payment = require("./payment")
// const p = new payment(id,"Credit")
// const Payment_id2=p.id

class credit{
    
    constructor(id,CardNumber,CVC,ExpireDate,Payment_id){
        this.id=id
        this.Payment_id=Payment_id
        this.CardNumber=CardNumber
        this.CVC=CVC
        this.ExpireDate=ExpireDate

    }




}
module.exports=credit
