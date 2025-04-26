import { API_ROUTES } from '@/constants/routes'
import axios from '../axios'

const getAllChats = async () => {
  const { data } = await axios.get(API_ROUTES.CHAT.GET)
  return data
}

const getChatMessages = async (params: { chatId: string }) => {
  const { data } = await axios.get(API_ROUTES.CHAT.GET + `/${params.chatId}`)
  return data
}

const startNewChat = async (params: { codeId: string }) => {
  const { data } = await axios.post(API_ROUTES.CHAT.GET + `/${params.codeId}`)
  return data
}

const askQuestion = async (params: { chatId: string }) => {
  const { data } = await axios.post(
    API_ROUTES.CHAT.GET + `/${params.chatId}/ask`
  )
  return data
}

export const chatApis = {
  getAllChats,
  getChatMessages,
  startNewChat,
  askQuestion,
}
