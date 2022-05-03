const express = require('express');
const router = express.Router();



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

const AuthorController = require("../controllers/AuthorController")
router.post("/CreateAuthor", AuthorController.CreateAuthor)
router.post("/AuthorLogin", AuthorController.Authorlogin)


const BlogController = require("../controllers/BlogController")
const MiddleWare = require("../MiddleWare/authorAuth")
router.post("/CreateBlog", MiddleWare.authenticate, BlogController.CreateBlog)
router.get("/getBlog", MiddleWare.authenticate, BlogController.getBlog)
router.put("/Updateblogs/:blogId", MiddleWare.authenticate, MiddleWare.authorise, BlogController.UpdateBlog)
router.delete("/blogs/:blogId", MiddleWare.authenticate, MiddleWare.authorise, BlogController.DeleteBlogbypathparam)
router.delete("/DeleteBlogs", MiddleWare.authenticate, MiddleWare.verifyAuthorId,BlogController.DeleteBlogbyqueryparam)





module.exports = router;