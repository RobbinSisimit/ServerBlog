'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authCategories from '../src/Category/category.routes.js';
import authPost from '../src/Publications/publications.routes.js'
import authComments from '../src/comments/comments.routes.js';
import Category from '../src/Category/category.model.js'


const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
    app.use("/Blog/v1/categories",authCategories);
    app.use("/Blog/v1/publications",authPost);
    app.use("/Blog/v1/comments",authComments);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
        await defaultCategory1();
        await defaultCategory2();
        await defaultCategory3();
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}

const defaultCategory1 = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "Tecnologia" });
        if (!defaultCategory) {
            await Category.create({ name: "Tecnologia" });
            console.log("Categoría por defecto1 creada: Tecnologia");
        } else {
            console.log("Categoría por defecto1 ya existente");
        }
    } catch (error) {
        console.error("Error al inicializar categoría1:", error);
    }
};

const defaultCategory2 = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "Taller" });
        if (!defaultCategory) {
            await Category.create({ name: "Taller" });
            console.log("Categoría por defecto2 creada: Taller");
        } else {
            console.log("Categoría por defecto2 ya existente");
        }
    } catch (error) {
        console.error("Error al inicializar categoría2:", error);
    }
};

const defaultCategory3 = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "PracticaSupervisada" });
        if (!defaultCategory) {
            await Category.create({ name: "PracticaSupervisada" });
            console.log("Categoría por defecto3 creada: PracticaSupervisada");
        } else {
            console.log("Categoría por defecto3 ya existente");
        }
    } catch (error) {
        console.error("Error al inicializar categoría3:", error);
    }
};


export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3010;

    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}