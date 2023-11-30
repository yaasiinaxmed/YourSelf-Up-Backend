import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.JWT_SECRET || 'defaultSecret';

const Authenticate = async (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({status: 401, message: "Authentication required!"})
    }

    console.log("TOKEN", token)

    const tokenWithoutBearer = token.split(" ")[1]

    jwt.verify(tokenWithoutBearer, secretKey, (error, decode) => {
        if(error) {
            return res.status(401).json({status: 401, message: "Token invalid!"})
        }

        console.log("DECODED USER", decode)

        req.user = decode

        next()
    })
}

export default Authenticate