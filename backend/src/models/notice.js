import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        conteudo: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default  mongoose.model("Notice", noticeSchema);