import {Schema, model} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "El name es obligatorio"],
        unique: true,
        trim: true
    }
})

CategorySchema.methods.toJSON = function () {
    const {__v,_id,...category} = this.toObject()
    category.uid = _id
    return category
}

export default model("Category", CategorySchema);