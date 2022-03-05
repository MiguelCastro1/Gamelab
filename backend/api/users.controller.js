import {User} from "../models/user.js"

export default class UsersCtrl{
    
    static async apiPostUser( req, res, next){
        //creates a new User
        try{
                
            const user = new User({
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
        //gets a user
        const userId = parseInt( req.param('id'))
        var userInfo = {}
        try{
            if (userId){
                //has valid filters
                    
                const userInfo = await User.findById( userId)
            }
            let response = {
                userInfo: userInfo
            }
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
            const userList = await User.find( )
            let response = {
                users: userList,
                page: page,

            }
            res.json( response)
        }catch( e){
            console.error( e)
        }
    }
}