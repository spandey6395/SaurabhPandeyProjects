const express = require('express');

const router = express.Router();



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

const AuthorController = require("../Controller/AuthorController")
router.post("/CreateAuthor", AuthorController.CreateAuthor)
router.post("/AuthorLogin",AuthorController.Authorlogin)


const BlogController = require("../Controller/BlogController")
router.post("/CreateBlog", BlogController.CreateBlog)
router.get("/getBlog", BlogController.getBlog)
router.put("/Updateblogs/:blogId", BlogController.UpdateBlog)
router.delete("/blogs/:blogId", BlogController.DeleteBlogID)
router.delete("/DeleteBlogs", BlogController.DeleteBlog)





module.exports = router;