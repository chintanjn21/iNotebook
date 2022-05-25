const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'iNotebook@2022';

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to the request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Please authenticate using valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using valid token'});
        console.log('dfff');
    }
}

module.exports = fetchuser;