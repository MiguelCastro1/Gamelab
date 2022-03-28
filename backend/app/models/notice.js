const mongoose = require("mongoose");

const Squema = mongoose.Squema;

const noticeSchema = new schema(
    {
        userId: {
            type: Squema.Types.ObjectId,
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