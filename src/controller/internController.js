const mongoose = require('mongoose')
const InternModel = require('../model/internModel')
const CollegeModel = require('../model/collegeModel')



//............................................. Create Intern........................................................

const createIntern = async (req, res) => {
    try {
        //NAME VALIDATION BY REJEX
        const validateName = (name) => {
            return String(name).match(
                /^[a-zA-Z]/);
        };

        //EMAIL VALIDATION BY REJEX
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        //MOBILE NUMBER VALIDATION BY REGEX
        const validateNumber = (number) =>{
            return String(number).match(
                /^(\+\d{1,3}[- ]?)?\d{10}$/
            )
        }

        const data = req.body

        //check for empty body
        if (Object.keys(data).length == 0) {     //check if no data given in body
            return res.status(400).send({status:false, message: "Feild Can't Empty. Please Enter Some Intern Details" });
         }

        //intern name
        if(!data.name){
            return res.status(400).send({status:false, message:"Intern name is missing"})
        }
        if(!validateName(data.name)){
            return res.status(400).send({status:false, message:"Intern name is INVALID"})
        }

        //Intern email
        if(!data.email){
            return res.status(400).send({status:false, message:"Intern email is missing"})
          }
          if(!validateEmail(data.email)){
            return res.status(400).send({status:false, message:"Intern email is INVALID"})
          }
          const email = await InternModel.findOne({email:data.email})
          if(email){
            return res.status(400).send({status:false, message:"Intern email already exists"})

          }

        //Intern mobile
        if(!data.mobile){
            return res.status(400).send({status:false, message:"Intern mobile number is missing"})
          }
          if(!validateNumber(data.mobile)){
            return res.status(400).send({status:false, message:"Intern mobile number is INVALID"})
          }
          const mobile = await InternModel.findOne({mobile:data.mobile})
          if(mobile){
            return res.status(400).send({status:false, message:"Intern mobile number already exists"})

          }

        //collegeId
        if(!data.collegeId){
            return res.status(400).send({status:false, message:"collegeId is missing"})
        }

        let isValidcollegeID = mongoose.Types.ObjectId.isValid(data.collegeId);//check if objectId is objectid
        if (!isValidcollegeID) {
            return res.status(400).send({ status: false, messagecd: `College ID ${data.collegeId} is INVALID!!` });
        }

        const id = await CollegeModel.findById(data.collegeId)
        if(!id){
            return res.status(404).send({status:false, message:`College ID ${data.collegeId} dont exist!!`})

        }

        const InterData = await InternModel.create(data)
        return res.status(201).send({status:true, data:InterData})
    }
    catch(err){
        res.status(500).send({ status: false, message: err.message })
    }
}

const getInterns = async (req,res) => {
    try
    {
       const collegeName = req.query.collegeName
       if(!collegeName){
         return res.status(400).send({status:false, message:"collegeName is missing in query params"})
        }
        
        const college = await CollegeModel.findOne({name:collegeName,isDeleted:false}).select({_id:1,name:1,fullName:1,logoLink:1})
        console.log(college)
        if(!college){
            return res.status(404).send({status:false, message:`College of name ${collegeName} not found!!!`})
        }
        console.log(college)
        
        const InternsData = await InternModel.find({collegeId:college._id,isDeleted:false}).select({isDeleted:0,collegeId:0,createdAt:0,updatedAt:0,__v:0})
        console.log(InternsData)
        
        if(InternsData.length==0){
            return res.status(404).send({status:false, message:`no intern found of ${college.name} college !!!`})

        }
        //using another object
        // const detail = {}
        // detail.name = college.name
        // detail.fullName = college.fullName
        // detail.logoLink = college.logoLink
        // detail.interests = InternsData
        // console.log(detail)

        //can also be done using college._doc.interests=[interdata]
        college._doc.interests=InternsData
        //we can deep copy using JSONstringfy method

        return res.status(200).send({status:true, data:college})


    }
    catch(err){
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports  = {createIntern , getInterns}


