import { Router } from 'express';
import { crearEstudiante, loginEstudiante } from '../controllers/auth.controller.js';

const router = Router();


router.post('/new_estudent', crearEstudiante)


router.post('/', loginEstudiante)


export default router;