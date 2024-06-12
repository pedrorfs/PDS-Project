import axios from "axios";

export const apiB3 = axios.create({
  baseURL: 'https://brapi.dev/api'
})