import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

//only path params
router.route("/:id").get( UsersCtrl.apiGetUser)

//only query params
router.route("").get( UsersCtrl.apiGetUsers)
router.route("").post( UsersCtrl.apiCreateUser)

export default router