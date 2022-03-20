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
    autorId: {
      type: Schema.Types.ObjectId, ref: "User",
      required: true,
    },
    senha: {
      type: String,
    },
    codigo: {
      type: String,
    //  unique: true,
     // required: true,
    },
    Alunos: [{
      userId: { type: Schema.Types.ObjectId, ref: "User"},
      notas: { type: Array}
    }],
    Ativo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
