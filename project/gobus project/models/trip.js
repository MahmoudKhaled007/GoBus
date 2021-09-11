// const bus = require("./bus")
// const buss_obj= new bus ("id", "Code", "BusClass", "BookedSeats", "AvailSeats")
// const buss_id=buss_obj.id

class trip {
constructor(id,Code,DepTime,ArTime,SeatNumber,bus_id){
this.id=id
this.Code=Code
this.DepTime=DepTime
this.ArTime=ArTime
this.SeatNumber=SeatNumber
this.bus_id=bus_id

}


}
module.exports=trip
