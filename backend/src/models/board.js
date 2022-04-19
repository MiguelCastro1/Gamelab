const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    userId: mongoose.SchemaTypes.ObjectId,
    listasTarefa: [
      {
        lista: { type: Schema.Types.ObjectId, ref: "taskList"}
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);
