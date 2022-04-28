const express = require('express');
const router = express.Router();

const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const middleware = require('../middleware/middleware.js');
const authorLogin = require('../controller/loginController.js');

//Author 
router.post("/authors",authorController.createAuthor)

router.post('/login', authorLogin.userlogin) //login

//Blog
router.post("/blogs",blogController.createBlogs)

router.get("/getBlogs",blogController.getBlogs)

router.get("/getFilterBlogs",blogController.getFilterBlogs)

router.put("/blogs/:blogId",blogController.updateBlog)

router.delete("/blogs/:blogId",blogController.deleteBlog)

router.delete("/deleteQuery",blogController.deleteParams)
module.exports = router;