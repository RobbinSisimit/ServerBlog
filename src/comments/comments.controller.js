import Comments from './comment.model.js';
import Post from '../Publications/publications.model.js';

export const creatComment = async (req, res) => {
    try{
        const {author, content, publication} = req.body;
        const [post] = await Promise.all([
            Post.findById(publication)
        ])

        if(!post){
            return res.status(400).json({
                success: false,
                message: "No existe la publicacion"
            })
        }

        const newComment = new Comments({
            author,
            content,
            publication
        })
        await newComment.save();
        res.status(200).json({
            success: true,
            message: "Comentario creado con exito",
            newComment
        })

    }catch(error){
        return res.status(500).json({
            message: "Error en al crear el comentario",
            error: error.message
        })
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