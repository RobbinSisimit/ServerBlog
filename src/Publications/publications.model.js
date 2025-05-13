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
    required: [true, "El category es obligatorio"],
    enum: ["Practica_Supervisada", "Taller", "Tecnologia"]
  },
  status: {
    type: Boolean,
    default: true
  }
},
);

export default mongoose.model("Publications", PublicationsSchema);
