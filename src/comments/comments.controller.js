import Comments from './comment.model.js';
import { response } from "express";
import Post from '../Publications/publications.model.js';

export const creatComment = async (req, res) => {
    try {
        const { author, content, publication } = req.body;

        const post = await Post.findById(publication);

        if (!post) {
            return res.status(400).json({
                success: false,
                message: "No existe la publicación"
            });
        }

        const newComment = new Comments({
            author,
            content,
            publication
        });

        await newComment.save();

        // 🔧 Asociar el comentario a la publicación
        await Post.findByIdAndUpdate(publication, {
            $push: { comments: newComment._id }
        });

        res.status(200).json({
            success: true,
            message: "Comentario creado con éxito",
            newComment
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el comentario",
            error: error.message
        });
    }
}

export const getComments = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {status: true};

    try{
        const comments = await Comments.find(query)
        .populate("publication", "title")
        .limit(Number(limite))
        .skip(Number(desde))

        const total = await Comments.countDocuments(query);
        res.status(200).json({
            success: true,
            message: "Comentarios obtenidos con exito",
            comments,
            total
        })
 
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message
        })
    }
}

export const deleteComent = async (req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comments.findById(id);
        if(!comment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            })
        }

        await Comments.findByIdAndUpdate(id, {status: false});
        res.status(200).json({
            success: true,
            message: "Comentario eliminado con éxito"
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message
        })

    }
}

export const updateComment = async (req, res) => {
    try{
        const {id} = req.params;
        const { _id, title, ...data} = req.body;
        const commentupdate = await Comments.findById(id);

        if(!commentupdate) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            })
        }

        const comment = await Comments.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json({
            success: true,
            message: "Comentario actualizado con éxito",
            comment
        }) 

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: error.message
        })

    }
}