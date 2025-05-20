import Publications from './publications.model.js';
import Comment from '../comments/comment.model.js'


export const createPublication = async (req, res) => {
  try {
    const data= req.body;
    const publication = new Publications({
      ...data,
    });
    await publication.save();
    
    res.status(200).json({
        succes: true,
        publication
    
    });

  } catch (error) {
    res.status(500).json({
        succes: false,
        msg: 'Error al crear la publicacion',
        error: error.message
    })
  }
};

export const getPublications = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const [total, publication] = await Promise.all([
            Publications.countDocuments(query),
            Publications.find(query)
                .populate({ path: 'comments', match: { status: true }, select: 'comment author createdAt', options: { sort: { createdAt: -1 } } })
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            succes: true,
            total,
            publication
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener la publicacion',
            error: error.message
        })
    }
}


export const updatePublication = async (req, res) => {
  try {
    const publication = await Publications.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!publication) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deletePublication = async (req, res) => {
  try {
    const publication = await Publications.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );
    if (!publication) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
