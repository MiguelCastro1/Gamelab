import {mongoose} from "mongoose"

const Schema = mongoose.Schema;

const courseSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo']
    }
}, {
    timestamps: true
})

const Course = mongoose.model("Course", courseSchema)
console.log( Course)
export {Course}