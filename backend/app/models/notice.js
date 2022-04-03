const mongoose = require("mongoose");

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

module.exports = mongoose.model("Notice", noticeSchema);