let courses

export default class CoursesDao {
    static async injectDB( conn){
        if( courses){
            //if is aload
            return
        }else{
            try{
                courses = await conn.db( process.env.GAMELAB_NS).collection("courses")
            }catch( e){
                console.error(`Unable to stablish a collection handle in courses: ${e}`)
            }
        }
    }
    static async getCourses({
        //get method for endpoint
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
        let cursor

        try {
            cursor = await courses.find( query)

        }catch( e){
            console.error(`Unable to issue find command, ${e}`)
            return { coursesList: [], numCourses: 0}
        }
        //get courses for specific page
        const displayCursor = cursor.limit(coursesPerPage).skip( page * coursesPerPage)

        try{
            const coursesList = await displayCursor.toArray()
            const numCourses = await courses.countDocuments( query)
            
            return { coursesList, numCourses}
        }catch ( e){
            console.error(
                `Unable to convert cursor to array or count the number of documents, ${e}`
            )
            return { coursesList: [], numCourses: 0}
        }
    }
}

