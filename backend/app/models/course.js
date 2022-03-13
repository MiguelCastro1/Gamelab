const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    nomeCurso: {
      type: String,
      required: true,
    },
    materia: {
      type: String,
      // required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    autorEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
