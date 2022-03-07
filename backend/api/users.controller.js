import {User} from "../models/user.js"

export default class UsersCtrl{
    
    static async apiCreateUser( req, res, next){
        //create a new User
        try{
            
            const user = new User({
                userId: req.query.userId,
                name: req.query.name,
                typeOfUser: req.query.typeOfUser,
                email: req.query.email,
                institution: req.query.institution,
                enroll: req.query.enroll
            })
            const response = await user.save()
            
            res.json(response)
        }catch( e){
            console.error( e)
        }
    }
    static async apiGetUser( req, res, next){
        //get a user by  identifier for a user
        const userId = req.params.id
        var userInfo = {}
        try{
            let filters = {}
            if ( userId){
                //has a identifier
                filters.email = userId
            }
            const userInfo = await User.find(filters)
            let response = userInfo
            res.json( response)
        }catch( e){
            console.error( e)
        }
    }

    static async apiGetUsers( req, res, next){
        //get a users by filters in pages
        const usersPerPage = req.query.usersPerPage ? parseInt( req.query.usersPerPage, 10) : 10
        const page = req.query.page ? parseInt( req.query.page, 10) : 0
        try{
            let filters = {}
            if (req.query.name){
                //has filters
                filters.name = req.query.name
            }
            //...
            const userList = await User.find(filters)
            let response = {
                users: userList,
                usersPerPage: usersPerPage,
                page: page
            }
            res.json( response)
        }catch( e){
            console.error( e)
        }
    }
}