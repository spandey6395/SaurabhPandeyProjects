
const { flat } = require('mongoose/lib/helpers/query/validOps')
const { object } = require('mongoose/lib/utils')
const AuthorModel = require('../models/AuthorModel')
const BlogModel = require('../models/BlogModel')

//----------------Create Blog POST /blogs

const CreateBlog = async function (req, res) {

    try {


        let blog = req.body
        if (Object.keys(blog).length != 0) {

            if (req.body.author_id == null) {
                return res.status(404).send("author_id is required ")
            }
            else {
                if (req.body.author_id) {
                    const isAuthor = await AuthorModel.findOne({ _id: req.body.author_id })
                    if (!isAuthor) return res.status(400).send("Entered authorId is not valid")
                }

            }

            let { title, body, author_id, tags, category, subcategory } = blog

            if (!title) {
                return res.status(400).send({ message: "Title is required" })
            }

            if (!body) {
                return res.status(400).send({ message: "body is required" })
            }

            if (!author_id) {
                return res.status(400).send({ message: "author_id is required" })
            }

            if (!tags) {
                return res.status(400).send({ message: "Tags is required" })
            }

            if (!category) {
                return res.status(400).send({ message: "Category is required" })
            }

            if (!subcategory) {
                return res.status(400).send({ message: "Subcategory is required" })
            }

            let BlogCreated = await BlogModel.create(blog)
            res.status(201).send({ data: BlogCreated })
        }
        else {
            res.status(400).send({ message: "BAD invalid request" });
        }

    }
    catch (err) {
        res.status(400).send({ msg: "Error", ERROR: err.message })
    }

}








//----------------Getblog/GET /blogs


const getBlog = async function (req, res) {
    try {

        let data = req.query
        if (data) {
            let blogs = await BlogModel.find({ isDeleted: false, isPublished: true, $or: [{ author_id: data.author_id }, { category: data.category }, { tags: data.tags }, { subcategory: data.subcategory }] }).populate('author_id')
            if (!blogs) res.status(404).send({ status: false, msg: "not found" })
            res.status(200).send({ status: true, data: blogs })
        }

    } catch (err) {

        res.status(404).send({ msg: "NOT FOUND", ERROR: err.message });
    }
}








//-----------------UpdateBlog/PUT /blogs/:blogId



const UpdateBlog = async function (req, res) {
    try {
        if ((typeof (req.body.title) != "string" && typeof (req.body.title) != "undefined") || (typeof (req.body.body) != "string" && typeof (req.body.body) != "undefined") || (typeof (req.body.isPublished) != "boolean" && typeof (req.body.isPublished) != "undefined") || (typeof (req.body.tags) != "string" && typeof (req.body.tags) != "undefined") || (typeof (req.body.subcategory) != "string" && typeof (req.body.subcategory) != "undefined")) {
            return res.status(400).send({ status: false, msg: "invalid input" })
        }
        let id = req.params.blogId;
        let BlogId = await BlogModel.findById(id);

        if (!BlogId) return res.status(404).send("BLog ID not found")


        if (Object.keys(req.body) == 0) {
            res.status(404).send({ status: false, msg: "Data Required in body field" })
        }

        if (req.body.isPublished == true) {
            req.body.isPublished = true
            req.body.publishedAt = new Date()
        }

        const update = await BlogModel.findByIdAndUpdate({ _id: id, isDeleted: false }, { $set: req.body }, { new: true })
        res.status(201).send({ status: true, Msg: update })
    } catch (err) {
        res.status(400).send({ status: false, msg: err.message })
    }

}






//---------------DELETE /blogs/:blogId/Path Param


const DeleteBlogID = async function (req, res) {

    try {

        let id = req.params.blogId;
        let BlogId = await BlogModel.findById(id);
        //console.log(BlogId)

        if (!BlogId) return res.status(404).send("BLog ID not found")


        let BlogDoc = await BlogModel.findOne({ _id: BlogId, isDeleted: false })
        //console.log(BlogDoc)
        if (!BlogDoc) {
            return res.status(404).send({ status: false, msg: "Blog does not exist" })
        }

        let deleteblog = await BlogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: Date(), isPublished: false } }, { new: true })
        res.status(201).send({ status: true, sent: deleteblog, msg: "Blog Deleted" })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const DeleteBlog = async function (req, res) {


    // let keyArr = Object.keys(req.query)
    // let somethingBad = false;
    // for (let i = 0; i < keyArr.length; i++) {
    //     if (!(keyArr[i] == "author_id" || keyArr[i] == "category" || keyArr[i] == "tags" || keyArr[i] == "subcategory" || keyArr[i] == "isPublished"))
    //         somethingBad = true;
    // }
    // if (somethingBad) {
    //     return res.status(400).send({ status: false, msg: "invalid input" })
    // }
    //req.query.isDeleted = false;
    // let date = new Date()
    // const data = await BlogModel.updateMany(req.query, { $set: { isDeleted: true, deletedAt: date } })
    // if (data.matchedCount == 0)
    //     return res.status(404).send({ status: false, msg: "blog not found" })
    // res.status(200).send({ status: true, data: "finally deleted Successfull " + data.matchedCount + " documents" })

    try {
        let { ...data } = req.query;
        if (Object.keys(data).length == 0) return res.send({ status: false, msg: "Error!, Details are needed to delete a blog" });

        let timeStamps = new Date();
        let deletedBlog = await BlogModel.updateMany(
            { $and: [{ $and: [{ isDeleted: false }, { isPublished: true }] }, { $or: [{ author_id: data.author_id }, { category: { $in: [data.category] } }, { tags: { $in: [data.tags] } }, { subcategory: { $in: [data.subcategory] } }] }] },
            { $set: { isDeleted: true, deletedAt: timeStamps, isPublished: false } },
            { new: true },
        )
        if (deletedBlog.modifiedCount == 0) return res.status(400).send({ status: false, msg: "No such blog exist or might have already been deleted" })

        res.status(200).send({ status: true, msg: "The blog has been deleted successfully" });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }







}



module.exports.CreateBlog = CreateBlog
module.exports.getBlog = getBlog
module.exports.UpdateBlog = UpdateBlog
module.exports.DeleteBlogID = DeleteBlogID
module.exports.DeleteBlog = DeleteBlog
