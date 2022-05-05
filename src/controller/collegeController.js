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
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        ///[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
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















// const createCollege = async (req, res) => {
//   try {

//     //EMAIL VALIDATION BY REJEX
//     const validateEmail = (email) => {
//       return String(email)
//         .toLowerCase()
//         .match(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
//     };

//     //PASSWORD VALIDATION BY REJEX
//     const validatePassword = (password) => {
//       return String(password).match(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
//       );
//     };

//     //STRING VALIDATION BY REJEX
//     const validateName = (name) => {
//      return String(name).match(
//          /^[a-zA-Z]/);
//     };


//     const data = req.body;

//     if (Object.keys(data).length == 0) {
//       return res.status(400).send({status:false, msg: "Feild Can't Empty.Please Enter Some Details" });
//     }

//     if (!data.fname){
//      return res.status(400).send({ status:false,msg:"First name is missing"});
//     }

//     //First Name validation by Rejex
//     if (!validateName(data.fname)) {
//       return res.status(400).send({status: false,msg: "First name must contain Alphabet or Number",});
//     }

//     if (!data.lname) {
//         return res.status(400).send({status:false ,msg:"Last name is missing"});
//     }

//     //last Name validation by Rejex
//     if (!validateName(data.lname)) {
//       return res.status(400).send({status: false,msg: "Last name must contain Alphabet or Number",});
//     }

//     if (!data.email){
//         return res.status(400).send({status:false,msg:"Email is missing"});
//     }

//     //email validation by Rejex
//     if (!validateEmail(data.email)) {
//       return res.status(400).send({status: false, msg: "Invaild E-mail id." });
//     }

//     if (!data.password) {
//         return res.status(400).send({status:false,msg:"Password is missing"});
//     }

//     //password validation by Rejex
//     if (!validatePassword(data.password)) {
//       return res.status(400).send({status: false,msg: "Password should contain at-least one number,one special character and one capital letter",}); //password validation
//     }

//     const email = await AuthorModel.findOne({ email: data.email }); //email exist or not

//     if (!email) {
//     const author = await AuthorModel.create(data);
//       return res.status(201).send({status:true,msg: author });
//     }
//     res.status(404).send({ status:false,msg: "Email already exist" });
//   }
//      catch (err) {
//     res.status(500).send({ status:false,error: err.message });
//   }
// };



// //.............................................PHASE (2) POST /login........................................................

// const login = async function (req, res) {
//   try {
//     const data = req.body;

//     if (Object.keys(data).length == 0) {
//       return res.status(400).send({ status:false,msg: "Feild Can't Empty.Please Enter Some Details" }); //details is given or not
//     }

//     let email = req.body.email;
//     let password = req.body.password;

//     if (!email){
//         return res.status(400).send({ sataus:false,msg: "Email is missing" });
//     }

//     if (!password){
//         return res.status(400).send({status:false,msg:"Password not given" });
//     }

//     const match = await AuthorModel.findOne({email: email,password: password,}); //verification for Email Password

//     if (!match)// No Data Stored in Match variable Beacuse no entry found with this email id nd password
//       return res.status(404).send({status:false,msg: "Email and Password not Matched" });

//     const token = jwt.sign(
//       {
//         authorId: match._id.toString(), //login successfully give the token
//       },
//       "group11" //secret key
//     );
//     res.setHeader("x-api-key", token);
//     res.status(200).send({ status: true, data: token });
//   }

//   catch (err)
//   {
//     res.status(500).send({ status:false,error: err.message });
//   }
// };

// module.exports = { createAuthor, login };
