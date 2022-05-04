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
            return res.status(400).send({status:false, message: "Feild Can't Empty.Please Enter Some Intern Details" });
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
            return res.status(400).send({ status: false, msg: `College ID ${data.collegeId} is INVALID!!` });
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
        
        const college = await CollegeModel.findOne({name:collegeName,isDeleted:false})
        if(!college){
            return res.status(404).send({status:false, message:"college dont exists"})

        }
        console.log(college)
        const InternsData = await InternModel.find({collegeId:college._id,isDeleted:false}).select({isDeleted:0,collegeId:0,createdAt:0,updatedAt:0,__v:0})
        if(InternsData.length==0){
            return res.status(404).send({status:false, message:"no records found of interns!!!"})

        }
        
        const detail = {}
        detail.name = college.name
        detail.fullName = college.fullName
        detail.logoLink = college.logoLink
        detail.interests = [InternsData]
        console.log(detail)

        return res.status(200).send({status:true, data:detail})


    }
    catch(err){
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports  = {createIntern , getInterns}



















// const createBlogs = async function (req, res) {   //create the Blog
//     try {

//         //TITLE FORMAT CHECK BY REJEX
//         const validatefield = (Feild) => {
//             return String(Feild)
//                 .match(
//                     /^[a-zA-Z]/
//                 );
//         };

//         const data = req.body
//         let token = req.headers["x-api-key"] || req.headers["x-Api-Key"];
//         if (Object.keys(data).length == 0) {
//             return res.status(400).send({status:false, msg: "Blog details not given" })//details is given or not
//         }
//         if (!data.title) {
//             return res.status(400).send({status:false,msg: "Title not given" })
//         }
//         if (!validatefield(data.title)) {
//             return res.status(400).send({ status: false, msg: "Invaild title Format" })//title validation By Rejex
//         }


//         if (!data.body)
//             return res.status(400).send({status:false, msg: "Body not given" })

//         if (!validatefield(data.body)) {
//             return res.status(400).send({ status: false, msg: "Invaild Body Format" })//BODY validation By Rejex
//             }
//         if (!data.authorId)
//             return res.status(400).send({status:false, msg: "authorId not given" })
//         if (!data.category)
//             return res.status(400).send({status:false, msg: "category not given" })

//         if (!validatefield(data.category)) {
//             return res.status(400).send({ status: false, msg: "Invaild Category Format" })//BODY validation By Rejex
//             }

//         if (!validatefield(data.category)) {
//                 return res.status(400).send({ status: false, msg: "Invaild Category" })//title validation By Rejex
//             }
//         if(data.tags){
//             const t = data.tags.filter((e)=>e.length!=0)
//             data.tags=t
//         }
//         if(data.subcategory){
//             const t = data.subcategory.filter((e)=>e.length!=0)
//             data.subcategory=t
//         }
//         if(data.isPublished==true){
//             data.publishedAt=new Date()
//         }
//         //check the format of the Email id if wrong then give message
//         let isValidauthorID = mongoose.Types.ObjectId.isValid(data.authorId);
//         if (!isValidauthorID) {
//             return res.status(400).send({ status: false, msg: "Author Id is Not Valid" });
//         }

//         const id = await AuthorModel.findById(data.authorId)
//         if (!id)
//             return res.status(404).send({status: false,msg: "authorId not found" })

//         const reEntry = await BlogModel.findOne({ title: data.title, authorId: data.authorId })
//         if (reEntry) {
//             return res.status(400).send({ status:false,msg: `you have a blog of title ${data.title}` })
//         }
//         let decodedtoken = jwt.verify(token, "group11");
//         if (decodedtoken.authorId!=req.body.authorId)  {
//             return res.status(401).send({ status: false, msg: "You are Not Authorized To create This Blog With This Author Id" });
//           }
//         const blog = await BlogModel.create(data)
//         return res.status(201).send({ status:true,msg: blog })
//     }
//     catch (err) {
//         res.status(500).send({status:false, error: err.message })
//     }

// }

// //.............................................PHASE (1) GET BLOGS........................................................


// const getBlogs = async function (req, res) {  //get blog using filter query params
//     try {
//         const authorId = req.query.authorId;
//         const category = req.query.category;
//         const tags = req.query.tags;
//         const subcategory = req.query.subcategory;
//         const obj = {
//             isDeleted: false,
//             isPublished: true,

//         };
//         if (category)
//             obj.category = category;
//         if (authorId)
//             obj.authorId = authorId;
//         if (tags)
//             obj.tags = tags;
//         if (subcategory)
//             obj.subcategory = subcategory;

//         if (obj.authorId) {
//             let isValidauthorID = mongoose.Types.ObjectId.isValid(obj.authorId);//check if objectId is objectid
//             if (!isValidauthorID) {
//                 return res.status(400).send({ status: false, msg: "Author Id is Not Valid" });
//             }

//             const id = await AuthorModel.findById(obj.authorId)//check id exist in author model
//             if (!id)
//                 return res.status(404).send({ status:false,msg: "authorId dont exist" })
//         }

//         const data = await BlogModel.find(obj);
//         if (data.length == 0) {
//             return res.status(404).send({ status: false, msg: "Blogs not found" });
//         }
//         res.status(200).send({ status: true, data: data });
//     } catch (err) {
//         res.status(500).send({ status: false, msg: err.message });
//     }
// };


// //.............................................PHASE (1) Update Blogs........................................................


