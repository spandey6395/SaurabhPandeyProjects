const authorModel=require("../model/authorModel")
const validator =require("../validator/validator.js")

const author = async function (req, res){

    try{

        const details = req.body

        if(!validator.isValidRequestBody(details)){

            res.status(400).send({status:false, msg:"Please provide author details"})

        }

        const {fname, lname, title, email, password} = details

        if (!validator.isValid(fname)){

            return res.status(400).send({status:false, msg:"please provide first name"})

        }

        if (!validator.isValid(lname)){

            return res.status(400).send({status:false, msg:"please provide last name"})

        }

        if (!validator.isValid(title)){

            return res.status(400).send({status:false, msg:"please provide title"})

        }

        if (!validator.isValid(email)){

            return res.status(400).send({status:false, msg:"please provide email"})

        }
        if (!validator.isValidEmail(email)){

            return res.status(400).send({status:false, msg:"please provide valid email"})

        }
        const emailUsed = await authorModel.findOne({email})

        if(emailUsed){

            return res.status(400).send({status:false, msg:`Email Id ${email} already exists`})

        }

        if (!validator.isValid(password)){

            return res.status(400).send({status:false, msg:"please provide password"})

        }

        if (!validator.isValidTitle(title)){

            return res.status(400).send({status:false, msg:"title should be Mr, Miss or Mrs"})

        }


      

        const data = await authorModel.create(details)  //creating the author details

        res.status(201).send({status: true, msg : "Author created and details saved successfully", data:data})

    }

    catch(err){

        res.status(500).send({status:false, error : err.message})

    }              

}

module.exports.author = author
