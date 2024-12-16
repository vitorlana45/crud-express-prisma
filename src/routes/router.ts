import { Router } from 'express'
import { registerUser, getUserByEmail, getUserByID, updateUser, deleteUser, getAllUsersPagination } from '../controllers/user.controller'

const router = Router();

router.post("/users", registerUser)
router.get("/users/:email", getUserByEmail)
router.get("/users/get/:id", getUserByID)
router.patch("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)
router.get("/users", getAllUsersPagination);


export default router;