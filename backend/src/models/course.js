const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    nomeCurso: {
      type: String,
      required: true
    },
    materia: {
      type: String,
      default: ""
      // required: true,
    },
    descricao: {
      type: String,
      required: true
    },
    autorEmail: {
      type: String,
      required: true,
      lowercase: true
    },
    autorId: {
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
    //  unique: true,
     // required: true,
    },
    Alunos: [{
      userId: { type: Schema.Types.ObjectId, ref: "User"},
      atividades: [{
        status: {
          type: String,
          enum: [ "entregue", "avaliado"]
        },
        nota: {
          type : Number,
          min: 0.0,
          max: 10.0
        },
        entregaUri: {type: String},
        dataEntrega: {type: Schema.Types.Date}
      }]
    }],

    secoes: [{
      titulo: {type: String, default: ""},
      conteudos: [
        {
          uri: {type: String},
          visivel: {type: Boolean, default: true},
          tipo: {type: String ,  enum: ["link", "arquivo", "atividade"]},
          titulo: {type: String},
          descricao: {type: String},
          dataInicio: {type: Schema.Types.Date},
          dataEntrega: {type: Schema.Types.Date},
        }
      ]
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
