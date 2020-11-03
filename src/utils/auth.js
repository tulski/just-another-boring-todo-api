import { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

import { User } from '../resources/user/user.model'

const createToken = (user) => jwt.sign({ id: user._id }, config.jwt)

const verifyToken = (token) => jwt.verify(token, config.jwt)

const signup = async (req, res) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(400).json({ message: 'email and password required' })
  }
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ message: 'email already in use' })
    user = await User.create({
      email: req.body.email,
      password: req.body.password,
    })
    const token = createToken(user)
    return res.status(200).json({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const signin = async (req, res) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(400).json({ message: 'email and password required' })
  }
  try {
    const user = await User.findOne({ email: req.body.email }).exec()
    if (!user) return res.status(400).json({ message: 'user does not exist' })
    const match = await user.checkPassword(req.body.password)
    if (!match)
      return res.status(400).json({ message: 'invalid email or password' })

    const token = createToken(user)
    return res.status(200).json({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const verify = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'authorization problem' })
  }
  try {
    const payload = await verifyToken(req.headers.authorization)
    const user = await User.findById(payload.id).select('-password').exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

const router = Router()

router //
  .route('/')
  .post(signup)
  .put(signin)

export default router
