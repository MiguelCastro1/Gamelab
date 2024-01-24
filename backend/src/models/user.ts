import {Schema, model, Document} from "mongoose";
export interface IUser {
  nome: string,
  email: string,
  instituicao?: string,
  perfil: string,
  dataNascimento: string,
  matricula: string,
  senha: string,
  cidade?: string,
  paisOrigem?: string,
  dataIngresso?: string,
  descricaoPerfil?: string,
  imageAvatar?: string,
  pathImageAvatar?: string,
  tokenRecuperarSenha?: string,
  experiencia?: number,
}

export interface IUserObj extends IUser, Document {

}

const userSchema = new Schema<IUser>(
  {
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
    perfil: {
      type: String,
      enum: ["professor", "aluno"],
      required: true,
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
      minlength: 8
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
    experiencia: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export default model<IUserObj>("User", userSchema);
