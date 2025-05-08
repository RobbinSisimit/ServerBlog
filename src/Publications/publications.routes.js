import { Router } from "express";
import {createPublication, getPublications, updatePublication, deletePublication } from "./publications.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.post("/", 
    [
        check("title", "El título es obligatorio").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("category", "Categoría no válida").isIn(["Practica_Supervisada", "Taller", "Tecnologia"]),
        validarCampos,
    ],
    createPublication
);
router.get("/", getPublications);
router.put("/:id", 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],
    updatePublication
);
router.delete("/:id", 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],    
    deletePublication
);

export default router;
