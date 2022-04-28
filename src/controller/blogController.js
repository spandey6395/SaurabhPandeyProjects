const BlogModel = require('../module/blogModel')
const AuthorModel = require("../module/authorModel")
const mongoose = require('mongoose')

//............................................2nd API (POST/blogs)...........................................................

const createBlogs = async function (req, res) {
    try {
        const data = req.body
        if(Object.keys(data).length==0){
            return res.send({msg:"Blog details not given"})//details is given or not
        }
        if (!data.title){
            if(data.title == " " || data.title == null)
            return res.status(400).send({ msg: "title not given" })
        }
        if (!data.body)
            return res.status(400).send({ msg: "body not given" })
        if (!data.authorId)
            return res.status(400).send({ msg: "authorId not given" })
        if (!data.category)
            return res.status(400).send({ msg: "category not given" })

        let isValidauthorID = mongoose.Types.ObjectId.isValid(data.authorId);
            if (!isValidauthorID) {
              return res.status(400).send({ status: false, msg: "Author Id is Not Valid" });
            }
        

         id = await AuthorModel.findById(data.authorId)
        if (!id)
            return res.status(404).send({ msg: "authorId not found" })

        const blog = await BlogModel.create(data)
        return res.status(201).send({ msg: blog })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}

//............................................3rd API (GET/blogs)...........................................................

const getFilterBlogs = async (req, res) => {
    try {

        const obj = {}
        obj.authorId = req.query.authorId
        obj.category = req.query.category
        obj.tags = req.query.tags
        obj.subcategory = req.query.subcategory
        obj.isDeleted=false     //deleted doc should not come
        console.log(obj)

        Object.keys(obj).forEach(key => {
            if (obj[key] == undefined) {
                delete obj[key]
            }
        })

        if(obj.authorId){
        const id = await AuthorModel.findById(obj.authorId)
        if (!id)
            return res.status(404).send({ msg: "authorId is invalid" })
        }

        const filterBlog = await BlogModel.find(obj)
        console.log(obj)
        return res.send({ msg: filterBlog })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

//............................................3rd API (GET/blogs)...........................................................


const getBlogs = async function (req, res) {
    try {
      const authorId = req.query.authorId;
      const category = req.query.category;
      const tags = req.query.tags;
      const subcategory = req.query.subcategory;
      const obj = {
        isDeleted: false,
        isPublished: true,
  
      };
      if (category)
      obj.category = category;
      if (authorId)
      obj.authorId = authorId;
      if (tags)
      obj.tags = tags;
      if (subcategory)
      obj.subcategory = subcategory;

      if(obj.authorId){
        const id = await AuthorModel.findById(obj.authorId)
        if (!id)
            return res.status(404).send({ msg: "authorId is invalid" })
        }

      const data = await BlogModel.find(obj);
      if (data.length == 0) {
        return res.status(404).send({ status: false, msg: "Blogs Id not found" });
      }
      res.status(200).send({ status: true, data: data });
    } catch (err) {
      res.status(500).send({ status: true, msg: err.message });
    }
  };

//............................................4th API (PUT/blogs/:blogID)....................................................


const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        // let data = req.body
        if(!blogId){
            return res.status(400).send({msg:"blogId not given"})
        }
        const blog = await BlogModel.findOne({ _id: blogId, isDeleted: false })
        
        if (!blog)
           return res.status(404).send({ msg: "nothing exist" })

        if(blog.isPublished==true){
            return res.status(404).send({msg:"blog already published"})
        }

        if(req.body.title){
        blog.title = req.body.title
        }
        if(req.body.body){
        blog.body = req.body.body
        }
        if(req.body.tags){
        let temp1 = blog.tags
        temp1.push(req.body.tags)
        blog.tags = temp1
        }
        if(req.body.subcategory){
        let temp2 = blog.subcategory
        temp2.push(req.body.subcategory)
        blog.subcategory = temp2
        }

        blog.publishedAt = new Date()
        blog.isPublished = true
        blog.save()
        console.log(blog)
        res.status(200).send({ msg: blog })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

//............................................5th API (DELETE/blogs/:blogID)....................................................


const deleteBlog = async (req, res) => {
    try {
        const id = req.params.blogId
        if (!id)
            return res.status(404).send({ msg: "give the blogId " })

        const blog = await BlogModel.findById(id)
        if (!blog)
            return res.status(404).send({ msg: "blogId is invalid" })

        if (blog.isDeleted == false) {
            blog.isDeleted = true
            blog.deletedAt = new Date()
            blog.save()
            return res.status(200).send({ msg: blog })
        }

        return res.status(404).send({ msg: "dont exist deleted" })
    }

    catch (err) {
        res.status(500).send({ error: err.message })
    }


}

//............................................6th API (DELETE/blogs?:queryParams)....................................................

const deleteParams = async (req,res)=>{
    try
    {
        const obj = {}     //obj is condition for find
        obj.authorId = req.query.authorId
        obj.category = req.query.category
        obj.tags = req.query.tags
        obj.subcategory = req.query.subcategory
        obj.isPublished=false
        obj.isDeleted=false
        console.log(obj)

        Object.keys(obj).forEach(key => {  //undefined value remove
            if (obj[key] == undefined) {
                delete obj[key]
            }
        })
        if(obj.authorId){
        const id = await AuthorModel.findById(req.query.authorId)
        if (!id)
            return res.status(404).send({ msg: "authorId is invalid" })
        }

        const blog = await BlogModel.find(obj)
        if(Object.keys(blog) == 0){
            return res.status(404).send({msg:"dont exist"})
        }
        for(let i=0;i<blog.length;i++){
        blog[i].isDeleted=true
        blog[i].deletedAt=new Date()
        blog[i].save()
        }
        return res.status(200).send({msg:blog})
        
    }
    
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
// const deleteBlogs = async (req, res) => {

//     try {
//         req.query.isDeleted =false;
//         console.log(req.query)
//         let date = new Date()
//         const data = await BlogModel.updateMany(req.query, { $set: { isDeleted: true ,deletedAt:date} })

//         if(data.matchedCount==0)
//         return res.status(404).send({ status: false, msg: "blog not found" })


//         res.status(200).send({ status: true,data:"finally deleted Successfull " +data.matchedCount+" documents" })
//     }
//     catch (err) {
//         res.send({ msg: err.message })
//     }


// }


module.exports = { createBlogs, getBlogs, getFilterBlogs, updateBlog, deleteBlog ,deleteParams} 

