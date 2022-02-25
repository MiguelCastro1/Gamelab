import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

import CoursesDao from "./dao/coursesDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.Port || 8000

MongoClient.connect(
    process.env.ATLAS_URI,
    {
        maxPoolSize: 3,
        wtimeoutMS: 2500,
        useNewUrlParser: true}
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then( async client =>{
        await CoursesDao.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })