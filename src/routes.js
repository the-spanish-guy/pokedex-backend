const express = require('express')

const routes = express.Router()

const AllPokemonController = require('./controllers/AllPokemonController')
const PokemonController = require('./controllers/PokemonController')

routes.get('/', AllPokemonController.show)
routes.get('/:idOrName', AllPokemonController.index)
routes.get('/pokemon/:id', PokemonController.index)

// https://pokeapi.co/api/v2/type/grass/

module.exports = routes
