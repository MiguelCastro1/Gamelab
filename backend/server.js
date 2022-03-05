import express from "express"
import cors from "cors"

import bearer from "express-oauth2-jwt-bearer"

import users from "./api/users.route.js"
import courses from "./api/courses.route.js"

const app = express()

app.use(cors())
app.use(express.json())
 
app.use("/api/v1/users", users)
app.use("/api/v1/courses", courses)


export default app