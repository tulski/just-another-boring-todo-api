import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import { connect } from './utils/db'

import authRouter, { verify } from './utils/auth'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import noteRouter from './resources/note/note.router'

export const app = express()

app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.use('/auth', authRouter)

app.use('/api', verify)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/note', noteRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`app listening at http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}
