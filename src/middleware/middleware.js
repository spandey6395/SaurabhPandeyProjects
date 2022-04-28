const jwt = require("jsonwebtoken");
const BlogModel = require('../module/blogModel')
const AuthorModel = require("../module/authorModel")

const authentication = async function (req, res, next) {
    try
    {
    let token = req.headers['x-Auth-Key'] || req.headers['x-auth-key']
    if (!token) {
        return res.status(404).send({ status: false, msg: "token must be present" });
    }
  
        let decodedtoken = jwt.verify(token, "group11")
        if (!decodedtoken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }
        next();
    }
    catch (err) {
            res.status(500).send({ msg: Error, error: err.message })

        }
}

const authorization = async function (req, res, next) {

    let token = req.headers['x-Auth-Key'] || req.headers['x-auth-key']

    
    try
    {
    const decodedtoken = jwt.verify(token, "group11")
    if (!decodedtoken)
        return res.status(401).send({ status: false, msg: "token is invalid" });
    
    const id = decodedtoken.authorId
    console.log(id)
    const user = req.query.userId
    console.log(user)
    if (user != id)
        return res.status(403).send({ status: false, msg: "cannot access" });
    next()

    }
    catch(err){
        res.status(500).send({ msg: Error, error: err.message })
    }

}

module.exports = { authentication, authorization }