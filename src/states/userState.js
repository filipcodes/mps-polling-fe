import { reactive } from 'vue'

export const user = reactive({
  signedIn: false,
  data: null,

  setSignedIn(value) {
    if (typeof value !== 'boolean') {
      console.error(
        'A non boolean value has been passed to the setSignedIn method of userState'
      )
      return
    }
    this.signedIn = value
  },

  setUser(value) {
    this.data = value
  }
})
