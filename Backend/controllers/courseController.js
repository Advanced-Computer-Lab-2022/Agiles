const Course = require('../models/Course')

// filter Courses by price

const filterCourses = async (req,res) => {
    const lowerBound = req.query['lowerBound']
    const upperBound = req.query['upperBound']
    const subjects = req.query['subject']
    const ratings = req.query['rating']
    courses = await Course.find({$or:[ {$and: [{price: {$gte : lowerBound}},{price: {$lte : upperBound}}]}, {rating: ratings}, {subject:subjects} ]})
    .sort({price: 1}).exec()

    if (subjects && lowerBound && ratings){
        courses = await Course.find({price: {$gte : lowerBound}, price: {$lte : upperBound}, rating: ratings, subject:subjects}).sort({price: 1}).exec()
        
    }
    else if (subjects && lowerBound){
        

        courses = await Course.find({price: {$gte : lowerBound}, price: {$lte : upperBound}, subject:subjects}).sort({price: 1}).exec()
    }
    else if (lowerBound && ratings){
        
        courses = await Course.find({price: {$gte : lowerBound}, price: {$lte : upperBound}, rating: ratings}).sort({price: 1}).exec()
    }
    else if(subjects && ratings){
        

        courses = await Course.find({rating: ratings, subject: subjects}).sort({price: 1}).exec()  
    }
    
        if (!courses){
            res.status(400).json({error: "Empty"})
        }
        else{
            res.status(200).json(courses)
        }
        
    
}

const courseSearch = async (req,res) => {
    const type = req.query['type']
    const search = req.query['search']

    if(type == "subject"){
        courses = await Course.find({subject: {$regex: new RegExp(search, "i")}})
    }
    else if (type == 'title'){
        courses = await Course.find({title: {$regex: new RegExp(search, "i")}})
    }
    else if (type =='instructor'){
        courses = await Course.find({instructor: {$regex: new RegExp(search, "i")}})
    }
    else{
        res.status(400).json({error: "Wrong Type"})
        return
    }

    if (!courses){
        res.status(400).json({error: "Empty"})
    }
    else{
        res.status(200).json(courses)
    }
    }


module.exports = {
    filterCourses,
    courseSearch
}