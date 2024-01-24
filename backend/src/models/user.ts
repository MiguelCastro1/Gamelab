import {Schema, model, Document} from "mongoose";

export enum Perfil {
  aluno = "aluno",
  professor = "professor"
}
export interface IUser {
  nome: string,
  email: string,
  instituicao?: string,
  perfil: Perfil,
  dataNascimento: Schema.Types.Date,
  matricula: string,
  senha: string,
  cidade?: string,
  paisOrigem?: string,
  dataIngresso?: Schema.Types.Date,
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
      enum: Object.values(Perfil),
      required: true,
    },
    dataNascimento: {
      type: Schema.Types.Date,
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
      type: Schema.Types.Date,
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
