const jwt = require('jsonwebtoken')

const auth = (req , res , next) => {

    //["Bearer,"fdcgvkhojlmo"j
    //const token = req.header("Authorization").replace("Bearer"," ")

    const token = req.header("Authorization").split(" ")[1]
    if(!token) return res.status(401).json({error : "Token required"});
    try{
        const decoded = jwt.verify(token,"secret_key") //to verify 
        console.log(decoded)
        req.user = decoded.userId;
        console.log(req.user)
        next();
    }catch(error){
        res.status(401).json({error : "Invalid Token"})
    }
}

module.exports = auth;