import { Router } from 'express'
import { getSessions, postSessions } from '../controllers/session.controllers.js'

const router = Router()

router.get('/', getSessions)
router.post('/', postSessions)

export default router
