import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import routes from './routes'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(function (request, response, next) {
      response.header('Access-Control-Allow-Origin', '*')
      next()
    })
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
