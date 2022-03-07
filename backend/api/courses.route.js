import express from "express"
import CoursesCtrl from "./courses.controller.js"

const router = express.Router()

router.route("").get( CoursesCtrl.apiSearchCourses)
router.route("").get( CoursesCtrl.apiGetCourses)
router.route("").post( CoursesCtrl.apiCreateCourse)

export default router