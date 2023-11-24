import mongoose from "mongoose";
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

export default mongoose.model("Board", boardSchema);
