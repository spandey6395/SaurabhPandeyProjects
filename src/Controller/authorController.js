const AuthorModel = require('../models/AuthorModel')
const jwt = require('jsonwebtoken')


/////////////////////////////////////////////////Create/CreateAuthor



const CreateAuthor = async function (req, res) {
    try {

        let data = req.body;

        if (Object.keys(data).length != 0) {

            let { fname, lname, email, title, password } = data

            if (!fname) return res.status(400).send({ status: false, msg: "Fname is required" })

            if (!lname) return res.status(400).send({ status: false, msg: "lname is required" })

            if (!title) return res.status(400).send({ status: false, msg: "title is required" })

            if (!password) return res.status(400).send({ status: false, msg: "password is required" })

            let emailID = await AuthorModel.findOne({ email })
            if (emailID) return res.status(400).send({ status: false, msg: "Email Already in use try with another email" })

            let saveData = await AuthorModel.create(data);
            res.status(201).send({ msg: saveData })
        }
        else {
            res.status(400).send({ status: false, msg: "Error : Data required" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Error", ERROR: err.message })
    }

}


/////////////////////////////////////////////////AuthorLogin 


const Authorlogin = async function (req, res) {

    try {

        let data = req.body

        if (Object.keys(data).length != 0) {
            let userName = req.body.email;
            let password = req.body.password;


            // if (userName == null && password == null) return res.status(400).send({ Msg: "userName and Passowrd required" })

            if (!userName) return res.status(400).send({ status: false, msg: "userName is required " })

            if (!password) return res.status(400).send({ status: false, msg: "Password is required " })

            let Author = await AuthorModel.findOne({ email: userName, password: password });

            if (!Author)
                return res.status(401).send({
                    status: false,
                    msg: "username or the password is not corerct",
                });


            let token = jwt.sign(
                {
                    AuthorId: Author._id.toString(),
                    Project: "BloggingSite",
                    organisation: "FunctionUp",
                },
                "functionup-uranium"
            );

            res.status(201).send({ status: true, emailID: userName, password, Data: token });
        } else { return res.status(404).send({ status: false, Msg: "Body is empty / Not Found" }) }
    }

    catch (baderror) {
        res.status(500).send({ msg: "check once it throws erroe", error: baderror.message })
    }
};




module.exports.CreateAuthor = CreateAuthor
module.exports.Authorlogin = Authorlogin
