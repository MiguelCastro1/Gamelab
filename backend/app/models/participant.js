const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course"
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);
