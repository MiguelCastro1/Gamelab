import CoursesDAO from "../dao/coursesDAO.js"

export default class CoursesCtrl{
    static async apiGetCourses( req, res, next){
        const coursesPerPage = req.query.coursesPerPage ? parseInt( req.query.coursesPerPage, 10) : 10
        const page = req.query.page ? parseInt( req.query.page, 10) : 0

        let filters = {}
        if (req.query.name){
            filters.name = req.query.name
        } 

        const { coursesList, numCourses} = await CoursesDAO.getCourses({
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
}