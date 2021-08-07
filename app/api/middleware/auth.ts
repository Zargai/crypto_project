
import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
   
    try {
        if ((req.headers.authorization.split(' ')[0] === 'Token') || (req.headers.authorization.split(' ')[0] === 'Bearer')) {
            var header = req.headers.authorization.split(' ')[1];
        }
        else { 
            var header = null
         }
        var decode = jwt.verify(header, 'jwt-token');
        next();

    } catch (error) {
        res.status(401).json({
            error: "Invalid Tokken"
        })
    }
}

export default Auth;