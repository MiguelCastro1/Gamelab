import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
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