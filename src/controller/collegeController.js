const CollegeModel = require("../model/collegeModel");


//.............................................PHASE (1) Create colleges........................................................

const createCollege = async (req,res) => {
  try
  {
    //STRING VALIDATION BY REJEX
    const validateName = (name) => {
     return String(name).match(
         /^[a-zA-Z]/);
    };

    //URL VALIDATION BY REGEX
    const validateurl = (url) =>{
      return String(url).match(
        /^(?:(?:(?:https?|ftp|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
      );
    };


    const data = req.body

    if (Object.keys(data).length == 0) {     //check if no data given in body
       return res.status(400).send({status:false, message: "Feild Can't Empty.Please Enter Some Details" });
    }
     
    //college name
    if(!data.name){
      return res.status(400).send({status:false, message:"College abrivite name is missing"})
    }
    if(!validateName(data.name)){
      return res.status(400).send({status:false, message:"College abrivite name is INVALID"})
    }

    //college fullname
    if(!data.fullName){
      return res.status(400).send({status:false, message:"College fullName is missing"})
    }
    if(!validateName(data.fullName)){
      return res.status(400).send({status:false, message:"College fullname is INVALID"})
    }

    //College logoLink
    if(!data.logoLink){
      return res.status(400).send({status:false,message:"College logoLink is missing"})
    }
    if(!validateurl(data.logoLink)){
      return res.status(400).send({status:false,message:"College logoLink is INVALID"})
    }

    //check for unique name
    const uniqueName = await CollegeModel.findOne({name:data.name})  //serach for name present in college collection
    if(uniqueName){
      return res.status(400).send({status:false,message:`College name:${data.name} is already registered!!!`})
    }

    const collegedata = await CollegeModel.create(data)
    return res.status(201).send({status:true, data:collegedata } )

  }
  catch(err){
    res.status(500).send({status:false,message:err.message})
  }
   

}

module.exports = {createCollege}













