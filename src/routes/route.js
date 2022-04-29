const express = require('express');

const router = express.Router();



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

const AuthorController = require("../Controller/AuthorController")
router.post("/CreateAuthor", AuthorController.CreateAuthor)
router.post("/AuthorLogin", AuthorController.Authorlogin)


const BlogController = require("../Controller/BlogController")
const MiddleWare = require("../MiddleWare/auth")
router.post("/CreateBlog", MiddleWare.authenticate, BlogController.CreateBlog)
router.get("/getBlog", MiddleWare.authenticate, BlogController.getBlog)
router.put("/Updateblogs/:blogId", MiddleWare.authenticate, MiddleWare.authorise, BlogController.UpdateBlog)
router.delete("/blogs/:blogId", MiddleWare.authenticate, MiddleWare.authorise, BlogController.DeleteBlogID)
router.delete("/DeleteBlogs", MiddleWare.authenticate, MiddleWare.verifyAuthorId, BlogController.DeleteBlog)





module.exports = router;