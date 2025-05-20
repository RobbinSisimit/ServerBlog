import mongoose from "mongoose";

const PublicationsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El title es obligatorio"]
  },
  description: {
    type: String,
    required: [true, "El description es obligatorio"]
  },
  category: {
    type: String,
    enum: ["Practica_Supervisada", "Taller", "Tecnologia"]
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
    required: false
  }],
  status: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Publications", PublicationsSchema);
