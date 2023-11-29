import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    cor: {
      type: Number,
      default: 0x000000
    },
    titulo: {
      type: String,
      default: ""
    },
    texto: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Task", taskSchema);
