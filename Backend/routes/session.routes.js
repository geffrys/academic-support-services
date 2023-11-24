import { Router } from 'express'
import { getSessions, postSessions, deleteSession } from '../controllers/session.controllers.js'

const router = Router()

router.get('/', getSessions)
router.post('/', postSessions)
router.delete("/:session_id", deleteSession)

export default router;
