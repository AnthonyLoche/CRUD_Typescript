import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser, homePage } from '../controllers/userController';

const router = Router();

router.get('/', homePage)
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
