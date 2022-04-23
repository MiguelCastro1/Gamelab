const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    userId: {
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
              type: mongoose.SchemaTypes.Number,
              required: true
            },
            type: Schema.SchemaTypes.Array,
            default: [
              {
                card:{
                  _id: false,
                  id: {
                    type: mongoose.SquemaTypes.Number,
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


module.exports = mongoose.model("Board", boardSchema);