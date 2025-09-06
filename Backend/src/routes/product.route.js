import express, { Router } from "express";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/product.controller";


const productRouter = Router();

productRouter.post('/add', addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);


export default productRouter;