import {Schema, model} from "mongoose";

const PublicationsSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Practica_Supervisada", "Taller", "Tecnologia"]
  },
  comments:[{
    type: Schema.Types.ObjectId,
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

export default model("Publications", PublicationsSchema);
