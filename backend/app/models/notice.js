const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
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