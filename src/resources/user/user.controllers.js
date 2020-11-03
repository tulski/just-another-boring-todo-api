import { User } from './user.model'

export const me = (req, res) => res.status(200).json({ data: req.user })

export const updateMe = (req, res) => {
  try {
    const user = User.findByIdAndUpdate(req.user._id, req.body, { new: true })
      .lean()
      .exec()
    return res.status(200).json({ user })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
