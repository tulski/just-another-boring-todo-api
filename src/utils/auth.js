import { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

import { User } from '../resources/user/user.model'

const createToken = (user) => jwt.sign({ id: user._id }, config.jwt.key)

const verifyToken = (token) => jwt.verify(token, config.jwt.key)

const signup = async (req, res) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(401).json({ message: 'email and password required' })
  }
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ message: 'email already in use' })
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    const token = createToken(user)
    return res.status(200).json({ token, expiresIn: config.jwt.expiresIn })
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}

const signin = async (req, res) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(401).json({ message: 'email and password required' })
  }
  try {
    const user = await User.findOne({ email: req.body.email }).exec()
    if (!user) return res.status(400).json({ message: 'user does not exist' })
    const match = await user.checkPassword(req.body.password)
    if (!match)
      return res.status(401).json({ message: 'invalid email or password' })

    const token = createToken(user)
    return res.status(200).json({ token, expiresIn: config.jwt.expiresIn })
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}

export const verify = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  try {
    const payload = await verifyToken(req.headers.authorization.split(' ')[1])
    const user = await User.findById(payload.id).select('-password').exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}

const router = Router()

router //
  .route('/')
  .post(signup)
  .put(signin)

export default router
