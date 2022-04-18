const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskListSchema = new Schema(
  {
    nome: {
        type: String,
        default: ""
    },
    tarefas: {
      type: mongoose.SchemaTypes.Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);