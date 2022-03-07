import { ObjectId } from "mongodb";
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
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partitipants: {
        type: Array,
        default: [
            {type: Schema.Types.ObjectId}
        ]
    }
}, {
    timestamps: true
})

const Course = mongoose.model("Course", courseSchema)
console.log( Course)
export {Course}