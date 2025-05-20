import { Router } from 'express';
import { check } from 'express-validator';
import { getComments, creatComment, updateComment,deleteComent } from './comments.controller.js';
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get('/', getComments);

router.post(
    "/",
    [
        validarCampos
    ],
    creatComment
)

router.delete(
    "/:id",
    [
        check("id", "No es un id de Mongo").isMongoId(),
        validarCampos
    ],
    deleteComent
)

router.put(
    "/:id",
    [
        check("id", "No es un id de Mongo").isMongoId(),
        validarCampos
    ],
    updateComment
)

export default router;