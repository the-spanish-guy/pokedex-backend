import axios from 'axios'

export const pokemonConnection = axios.create({
  baseURL: process.env.API_DOMAIN
})
