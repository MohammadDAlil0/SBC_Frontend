import { API_ROUTES } from '@/constants/routes'
import axios from '../axios'
import { SignUpFormData } from '@/app/auth/signup/Form'
import { ForgetPasswordFormData, LoginFormData } from '@/lib/validations'

const signup = async (params: SignUpFormData) => {
  const { data } = await axios.post(API_ROUTES.AUTH.SIGNUP, {
    ...params,
  })
  return data
}

const login = async (params: LoginFormData) => {
  const { data } = await axios.post(API_ROUTES.AUTH.LOGIN, {
    ...params,
  })
  return data
}

const resetPassword = async (params: { password: string }, token: string) => {
  const { data } = await axios.patch(
    API_ROUTES.AUTH.RESET_PASSWORD + `/${token}`,
    {
      ...params,
    }
  )
  return data
}
const forgetPassword = async (params: ForgetPasswordFormData) => {
  const { data } = await axios.patch(API_ROUTES.AUTH.FORGET_PASSWORD, {
    ...params,
  })
  return data
}

const getMe = async () => {
  const { data } = await axios.get(API_ROUTES.AUTH.GET_ME)
  return data
}

export const authApis = {
  signup,
  login,
  resetPassword,
  getMe,
  forgetPassword,
}
