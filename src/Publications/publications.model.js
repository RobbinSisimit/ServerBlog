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
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true
  }
});

PublicationsSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.fechaCreacion) {
      ret.fechaCreacion = new Date(ret.fechaCreacion).toLocaleDateString("es-ES");
    }
    return ret;
  }
});

export default mongoose.model("Publications", PublicationsSchema);
