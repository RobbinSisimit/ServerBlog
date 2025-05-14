import {Schema, model} from "mongoose";

const CommentSchema = new Schema({
    author: {
        type: String,
        required: [true, "El author es obligatorio"]
    },
    content: {
        type: String,
        required: [true, "El content es obligatorio"]
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: "Publications",
        required: [true, "El publicationId es obligatorio"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true,
    versionKey: false
});

CommentSchema.methods.toJSON = function () {
    const {__v,_id,...comments} = this.toObject()
    comments.uid = _id
    return comments
}

export default model("Comments", CommentSchema);