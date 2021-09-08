const jwt=requier("jsonwebtoken")
// exports.checkADAuth=(Request,response,next)=>{
//     const token =request.body.token
//     if(!token){
//     return response.status(401).json({
//     statyse:"error",
//     msg:"401 not auth"
    
    
//     })
    exports.checkADAuth=(Request,response,next)=>{
        const headerData =request.header.authorazation.split(" ")
        const token = headerData[1]

        if(!token){
        return response.status(401).json({
        statyse:"error",
        msg:"401 not auth"
        
        
        })
        
    
    }else{
    
        jwt.verify(token,'123456',(error,data)=>{
            if(erorr){
                return response.status(401).json({
                    statyse:"error",
                    msg:"401 not auth"
                    
                    
                    })

            }else{
                next()


            }

        })
    }
    
    
    
    
  

}

exports.checkPassAuth=(Request,response,next)=>{
    const headerData =request.header.authorazation.split(" ")
    const token = headerData[1]
    
    if(!token){
    return response.status(401).json({
    statyse:"error",
    msg:"401 not auth"
    
    
    })
    

}else{

    jwt.verify(token,'12345',(error,data)=>{
        if(erorr){
            return response.status(401).json({
                statyse:"error",
                msg:"401 not auth"
                
                
                })

        }else{
            next()


        }

    })
}






}