
import {Course} from "../models/course.js"
import {mongoose} from "mongoose"

class coursesDao{
    static async getCourses({
        filters = null,
        page = 0,
        coursesPerPage = 10,
        } = {}) {
        let query
        if (filters) {
            if ("name" in filters){
                query = {
                    $text: { search: filters["name"]}
                }
            }
        }
        let coursesList

        try {
            coursesList = await Course.find( filters).limit(coursesPerPage).skip( page * coursesPerPage)

        }catch( e){
            console.error(`Unable to issue find command, ${e}`)
            return { coursesList: [], numCourses: 0}
        }
        console.log( coursesList) 
        try{
            const numCourses = coursesList.length
            
            return { coursesList, numCourses}
        }catch ( e){
            console.error(
                `Unable to convert cursor to array or count the number of documents, ${e}`
            )
            return { coursesList: [], numCourses: 0}
        }
    }
}
export default class CoursesCtrl{
    static async apiSearchCourses( req, res, next){
        const coursesPerPage = req.query.coursesPerPage ? parseInt( req.query.coursesPerPage, 10) : 10
        const page = req.query.page ? parseInt( req.query.page, 10) : 0

        let filters = {}
        if (req.query.name){
            filters.name = req.query.name
        } 

        const { coursesList, numCourses} = await coursesDao.getCourses({
            filters,
            page,
            coursesPerPage
        })
        
        let response = {

            courses: coursesList,
            page: page,
            filters: filters,
            entries_per_page: coursesPerPage,
            total_results: numCourses
        }
        res.json( response)
    }
    static async apiGetCourses( req, res, next){
        //get a course by a course._id, course.owner or a course.participant
        let filters = {}

        if (req.query.id){
            filters._id = new mongoose.Types.ObjectId( req.query.id)
        }else if(req.query.owner){
            filters.owner = new mongoose.Types.ObjectId( req.query.owner)
        }else if(req.query.partitipant){
            filters.partitipants = new mongoose.Types.ObjectId( req.query.partitipant)
        }
        const coursesList= await Course.find(filters)
        let response = {

            courses: coursesList
        }
        res.json( response)
    }
    static async apiCreateCourse( req, res, next){
        //create a active new course 
        try{
            
            const course = new Course({
                name: req.query.name,
                password: req.query.password,
                status: 'ativo',
                owner: new mongoose.Types.ObjectId( req.query.owner)
            })

            const response = await course.save()
                
            res.json(response)
        }catch( e){
            console.error( e)
        }
    }
}
