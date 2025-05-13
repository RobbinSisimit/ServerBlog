import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "El author es obligatorio"]
    },
    content: {
        type: String,
        required: [true, "El content es obligatorio"]
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
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


export default mongoose.model("Comments", CommentSchema);