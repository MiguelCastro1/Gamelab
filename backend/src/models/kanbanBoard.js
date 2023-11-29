import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    userId: {
      unique: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    counter: {
      type: mongoose.SchemaTypes.Number,
      required: true
    },
    columns: {
      type: mongoose.SchemaTypes.Array,
      default: [
        {
          cards: { 
            _id: false, 
            id: {
              unique: true,
              type: mongoose.SchemaTypes.Number,
              required: true
            },
            type: mongoose.SchemaTypes.Array,
            default: [
              {
                card:{
                  _id: false,
                  id: {
                    unique: true,
                    type: mongoose.SchemaTypes.Number,
                    required: true
                  },
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Board", boardSchema);