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
      default: "",
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
    imageAvatar: {
      type: String,
    },
    pathImageAvatar: {
      type: String,
    },
    tokenRecuperarSenha: {
      type: String,
    },
    exp: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
