import app from "./server.js"
import dotenv from "dotenv"

import {mongoose} from "mongoose"

dotenv.config()

const port = process.env.Port || 8000

mongoose.connect(
    process.env.ATLAS_URI,
    {
        maxPoolSize: 3,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true}
    ).catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then( async client =>{
        //await CoursesDao.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
