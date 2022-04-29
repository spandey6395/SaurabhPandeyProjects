const express = require('express');
const router = express.Router();

const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const middleware = require('../middleware/middleware.js');


//Author 
router.post("/authors",authorController.createAuthor)

router.post('/login', authorLogin.userlogin) //login Phase 2

//Blog

router.post("/blogs",middleware.authentication,blogController.createBlogs)

router.get("/getBlogs",middleware.authentication,blogController.getBlogs)

router.put("/blogs/:blogId",middleware.authentication,middleware.authorization, blogController.updateBlog)

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.deleteBlog)

router.delete("/deleteQuery",middleware.authentication,middleware.authorization,blogController.deleteParams)

module.exports = router;