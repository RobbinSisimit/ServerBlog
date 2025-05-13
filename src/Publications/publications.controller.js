import Publications from './publications.model.js';


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
  try {
    const publications = await Publications.find({ status: true });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
