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
    dataNascimento: {
      type: String,
      required: true,
    },
    matricula: {
      type: String,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
    },
    paisOrigem: {
      type: String,
    },
    dataIngresso: {
      type: String,
    },
    descricaoPerfil: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
