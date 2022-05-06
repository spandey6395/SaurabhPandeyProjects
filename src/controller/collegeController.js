const CollegeModel = require("../model/collegeModel");


//.............................................Create colleges........................................................

const createCollege = async (req,res) => {
  try
  {
    //STRING VALIDATION BY REJEX
    const validateName = (name) => {
     return String(name).match(
         /^[a-zA-Z][a-zA-Z]/
         );
    };

    //URL VALIDATION BY REGEX
    const validateurl = (url) =>{
      return String(url).match(
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/        
      )
    };


    const data = req.body

    if (Object.keys(data).length == 0) {     //check if no data given in body
       return res.status(400).send({status:false, message: "Feild Can't Empty. Please Enter Some Details" });
    }
     
    //college name
    if(!data.name){
      return res.status(400).send({status:false, message:"College abbrevaite name is missing"})
    }
    if(!validateName(data.name)){
      return res.status(400).send({status:false, message:"College abbreviate name is INVALID"})
    }
        //check for unique name
        const uniqueName = await CollegeModel.findOne({name:data.name})  //search for name present in college collection
        if(uniqueName){
          return res.status(400).send({status:false,message:`College of name ${data.name} is already registered!!!`})
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



    const collegedata = await CollegeModel.create(data)
    return res.status(201).send({status:true, data:collegedata } )

  }
  catch(err){
    res.status(500).send({status:false,message:err.message})
  }
   

}

module.exports = {createCollege}
