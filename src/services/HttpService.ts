import axios from 'axios'

export const deployConnection = axios.create({
  baseURL: process.env.API_DOMAIN
})
