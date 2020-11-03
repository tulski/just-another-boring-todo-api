import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['todo', 'doing', 'done'],
      default: 'todo',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timeStamp: true }
)

export const Item = mongoose.model('item', itemSchema)
