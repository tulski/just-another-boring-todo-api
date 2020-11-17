import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
)

userSchema.pre('save', async function f(next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    this.password = await bcrypt.hash(this.password, 10)
    return next()
  } catch (e) {
    return console.error(e)
  }
})

userSchema.methods.checkPassword = async function f(password) {
  const passwordHash = this.password
  try {
    return await bcrypt.compare(password, passwordHash)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const User = mongoose.model('user', userSchema)
