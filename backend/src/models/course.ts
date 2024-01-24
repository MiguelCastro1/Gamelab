import {Schema, model, Document} from "mongoose";

export enum Status {
  aberto = "aberto",
  entregue =  "entregue",
  avaliado =  "avaliado"
}

export interface ICourse {
  nome: String,
  materia: String,
  descricao: String,
  emailProfessor: String,
  idProfessor: Schema.Types.ObjectId,
  senha: String,
  codigo: string,
  alunos: IAluno[],
  secoes: ISecoes[],
  ativo: boolean
}

export interface IAluno {
  userId: Schema.Types.ObjectId,
  atividades: IAtividades[]
}

export interface IAtividades {
  atividadeId: Schema.Types.ObjectId,
  status: Status,
  nota: number,
  entregaUri: string,
  dataEntrega: string
}

export interface ISecoes{
  titulo: string,
  conteudos: IConteudos[]
}

export enum Tipo {
  link = "link",
  arquivo =  "arquivo",
  atividade =  "atividade"
}

export interface  IConteudos {
  arquivos: string[],
  visivel: boolean,
  tipo: Tipo,
  titulo: string,
  descricao: string,
  peso: number,
  dataInicio: Schema.Types.Date,
  dataEntrega: Schema.Types.Date,
}

export interface ICourseObg extends ICourse, Document { }

const courseSchema = new Schema<ICourse>(
  {
    nome: {
      type: String,
      required: true
    },
    materia: {
      type: String,
      default: ""
    },
    descricao: {
      type: String,
      required: true
    },
    emailProfessor: {
      type: String,
      required: true,
      lowercase: true
    },
    idProfessor: {
      type: Schema.Types.ObjectId, ref: "User",
      required: true,
    },
    senha: {
      type: String,
      default: ""
    },
    codigo: {
      type: String,
      default: ""
    },
    ativo: {
      type: Boolean,
      default: true
    },
    alunos: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User"},
        atividades: [
          {
            atividadeId: { type: Schema.Types.ObjectId},
            status: {
              type: String,
              enum: Object.values(Status)
            },
            nota: {
              type : Number,
              min: 0.0,
              max: 10.0
            },
            entregaUri: {type: String},
            dataEntrega: {type: Schema.Types.Date}
          }
        ]
      }
    ],
    secoes: [
      {
        titulo: {
          type: String, 
          default: ""
        },
        conteudos: [
          {
            conteudoId: { type: Schema.Types.ObjectId},
            arquivos: [
              {type: String}
            ],
            visivel: {type: Boolean, default: true},
            tipo: {type: String ,  enum: Object.values(Tipo)},
            titulo: {type: String},
            descricao: {type: String},
            dataInicio: {type: Schema.Types.Date},
            dataEntrega: {type: Schema.Types.Date},
            peso: {type: Schema.Types.Number},
          }
        ]
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default model<ICourseObg>("Course", courseSchema);
