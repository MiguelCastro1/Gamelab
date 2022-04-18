const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    listasTarefa: {
      type: mongoose.SchemaTypes.Array,
      default: ()=>{
        let model = mongoose.model( "TaskList")

        let defaultTaskLists = [
            {
                nome: "Por Fazer",
                tarefas: []
            },{
                nome: "Em andamento",
                tarefas: []
            },{
                nome: "Concluido",
                tarefas: []
            }
        ]
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
