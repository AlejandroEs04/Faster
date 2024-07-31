import express from "express";
const router = express.Router();

import { create, deleteOne, deleteProductSize, findAll, recoveryOne, update } from "../controllers/productController.js";
import checkAuth from "../middleware/checkAuth.js";

// Rutas para Producto(s)
router.route('/').get(findAll).post(checkAuth, create)
router.route('/:id').delete(checkAuth, deleteOne).put(checkAuth, update)
router.route('/:id/recovery').get(checkAuth, recoveryOne)
router.delete('/:productID/sizes/:sizeID', checkAuth, deleteProductSize)

export default router;