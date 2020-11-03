import { Router } from 'express'
import { me, updateMe, deleteMe } from './user.controllers'

const router = Router()

router //
  .route('/')
  .get(me)
  .put(updateMe)
  .delete(deleteMe)

export default router
