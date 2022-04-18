const mongoose = require("mongoose");
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
    conteudo: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
