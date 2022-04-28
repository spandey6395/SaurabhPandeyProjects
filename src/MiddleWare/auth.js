const jwt = require('jsonwebtoken');
const BlogModel = require('../models/BlogModel');


//====================Authenticate Token


const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "functionup-uranium");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "token is invalid" });


        next()
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err });
    }
}



//============================Authorize Blog/id


const authorise = async function (req, res, next) {
    try {

        let token = req.headers["x-api-key"];
        let blogId = req.params.blogId;
        let blogDetails = await BlogModel.findById(blogId)
        let authorId = blogDetails.author_id
        let decodedToken = jwt.verify(token, "functionup-uranium");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "token is invalid" });
        let decoded = decodedToken.AuthorId
        if (authorId != decoded) res.status(400).send({ status: false, msg: "anthentication denied" })
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err });
    }
}




//========================= Authorise author_id

const verifyAuthorId = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        let authodid = req.query.author_id
        let decodedToken = jwt.verify(token, "functionup-uranium");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "token is invalid" });
        let decoded = decodedToken.AuthorId
        if (authodid != decoded) res.status(400).send({ status: false, msg: "anthentication denied" })
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err });
    }
}




module.exports.authenticate = authenticate
module.exports.authorise = authorise
module.exports.verifyAuthorId = verifyAuthorId