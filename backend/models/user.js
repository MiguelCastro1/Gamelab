import {mongoose} from "mongoose"

const Schema = mongoose.Schema;

const userSchema = new Schema({
    typeOfUser: {
        type: String,
        enum: ['professor', 'aluno'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    institution: {
        type: String,
        trim: true
    },
    enroll: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
console.log( User)
export {User}
