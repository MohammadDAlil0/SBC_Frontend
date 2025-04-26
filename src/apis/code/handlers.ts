import { API_ROUTES } from '@/constants/routes'
import axios from '../axios'

const getAll = async () => {
  const { data } = await axios.get(API_ROUTES.CODE.GET)
  return data
}

const createCode = async () => {
  const { data } = await axios.post(API_ROUTES.CODE.ACTION)
  return data
}

export const codeApis = {
  getAll,
  createCode,
}
