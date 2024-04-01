import { reactive } from 'vue'

export const signIn = reactive({
  email: '',
  password: '',
  signInStep: 0, // 0: User should Input Email, 1: User should input OTP-PIN
  errorMessage: null
})
