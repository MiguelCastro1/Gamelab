import mongoose from "mongoose";
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

export default mongoose.model("TaskList", taskListSchema);