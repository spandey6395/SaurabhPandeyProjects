const AuthorModel = require('../models/AuthorModel')

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


module.exports.CreateAuthor = CreateAuthor