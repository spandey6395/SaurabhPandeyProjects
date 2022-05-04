const express = require('express');
const router = express.Router();

const collegeController = require('../controller/collegeController')
const internController  = require('../controller/internController')
//college
router.post("/functionup/colleges",collegeController.createCollege)


//Intern

router.post("/functionup/interns",internController.createIntern)

 router.get("/functionup/collegeDetails",internController.getInterns)



module.exports = router;