import { Router } from "express";
import { getCategorias } from './category.controller.js';

const router = Router();


router.get('/', getCategorias);

export default router;
