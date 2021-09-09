const jwt=require("jsonwebtoken")

    exports.checkADAuth=(Request,response,next)=>{
    const headerData =Request.headers.authorazation.split(" ")
        
        const token = headerData[1]

        console.log(headerData);
    }

exports.checkPassAuth=(Request,response,next)=>{
    const headerData =request.headers.authorazation.split(" ")
    const token = headerData[1]
    
    if(!token){
    return response.status(401).json({
    statyse:"error",
    msg:"401 not auth"
    
    
    })
    

}else{

    jwt.verify(token,'12345',(error,data)=>{
        if(error){
            return response.status(401).json({
                status:"error",
                msg:"401 not auth"
                
                
                })

        }else{
            next()


        }

    })
}






}
// const jwt = require("jsonwebtoken")

// exports.checkADAuth = (request, response, next) => {
//     const token = request.body.token

//     if (!token) {
//         return response.status(401).json({
//             status:"error",
//             msg:"401 not Auth"
//         })
//     }else{
//         jwt.verify(token, '123456', (error, data) => {
//             if (error) {
//                 return response.status(401).json({
//                     status:"error",
//                     msg:"401 not Auth"
//                 })
//             } else {
//                 next()
//             }
//         })
        
//     }
    
// }