import mongoose from 'mongoose'
import config from '../config'

export const connect = (url = config.dbUrl, opts = {}) =>
  mongoose.connect(url, {
    ...opts,
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
