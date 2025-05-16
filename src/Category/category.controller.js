import Category from './category.model.js'

export const getCategorias = async (req, res) => {
  try {
      const categorias = await Category.find();
      res.json({
          ok: true,
          categorias
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};