import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timeStamp: true }
)

export const Note = mongoose.model('note', noteSchema)
