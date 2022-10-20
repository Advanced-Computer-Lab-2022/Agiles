const express = require('express');
const router = express.Router();
 
//GET ALL COURSES
router.get('/',(req,res)=>{
    res.json({mssg: 'Get all courses'})
});
module.exports = router;    