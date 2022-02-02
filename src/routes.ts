import { Router } from 'express'

import ShouldDeployController from '@controllers/ShouldDeployController'

const routes = Router()

routes.get('/deploy', ShouldDeployController.index)

export default routes
