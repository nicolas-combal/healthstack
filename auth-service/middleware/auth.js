const jwt = require("jsonwebtoken")

function auth(req, res, next){
    const jwtToken = req.cookies["jwtToken"];
    if (!jwtToken){
        return res.status(401).json({message: "Non autorisé"})
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Non autorisé"})
        }
        req.user_id = decoded.user_id
        next()
    })
}


function authDoctor(req, res, next){
    const jwtToken = req.cookies["jwtToken"];
    if (!jwtToken){
        return res.status(401).json({message: "Non autorisé"})
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Non autorisé"})
        }
        if (decoded.role === 'doctor'){
            req.user_id = decoded.user_id
            return next()
        }
        return res.status(403).json({message: "Acces reserve aux docteurs"})
    })
}


module.exports = {
    auth,
    authDoctor
}
