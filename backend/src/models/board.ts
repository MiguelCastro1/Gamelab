import {Schema, model, Document} from "mongoose";

export interface ILista {
  lista: Schema.Types.ObjectId
}
export interface IBoard extends Document {
  userId:  Schema.Types.ObjectId,
  listasTarefa: ILista[]

}
const boardSchema = new Schema<IBoard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User"},
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

export default model<IBoard>("Board", boardSchema);
