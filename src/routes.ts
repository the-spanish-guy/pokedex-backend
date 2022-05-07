import { Router } from 'express'

import PokemonController from './controllers/PokemonController'

const routes = Router()

// routes.get('/deploy', ShouldDeployController.index)
routes.get('/pokemons', PokemonController.index)
routes.get('/pokemons/:id', PokemonController.show)
routes.get('/pokemons/type/:id', PokemonController.getByType)

export default routes
