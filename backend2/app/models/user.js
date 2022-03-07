const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    tipoUsuario: {
      type: String,
      enum: ["professor", "aluno"],
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    instituicao: {
      type: String,
      trim: true,
    },
    matricula: {
      type: String,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    dataNascimento: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
