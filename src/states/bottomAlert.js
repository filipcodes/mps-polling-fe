import { reactive } from 'vue'

export const alert = reactive({
  isVisible: false,
  text: 'Alert text',
  type: 'success',

  show(text) {
    this.text = text
    this.isVisible = true
    setTimeout(() => {
      this.isVisible = false
    }, 4000)
  },

  success(text) {
    this.type = 'success'
    this.show(text)
  },

  error(text) {
    this.type = 'error'
    this.show(text)
  },

  close() {
    this.isVisible = false
  }
})
