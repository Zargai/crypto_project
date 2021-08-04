import jwt from 'jsonwebtoken'

const Auth = (req, res, next) => {
    //using try catch for error
    try {
        if ((req.headers.authorization.split(' ')[0] === 'Token') || (req.headers.authorization.split(' ')[0] === 'Bearer')) {
            var header = req.headers.authorization.split(' ')[1];
        }
        else { 
            var header = null
         }
        var decode = jwt.verify({
            getToken: header,
            secret: 'jwt-token',
            userProperty: 'token',
        });
        console.log("header", header)
        console.log("decode", decode)
        next();

    } catch (error) {
        res.status(401).json({
            error: "Invalid Tokken"
        })
    }
}

export default Auth;