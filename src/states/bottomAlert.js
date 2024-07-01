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
    this.text = text
    this.type = 'success'
    this.isVisible = true
    setTimeout(() => {
      this.isVisible = false
    }, 4000)
  },

  error(text) {
    this.text = text
    this.type = 'error'
    this.isVisible = true
    setTimeout(() => {
      this.isVisible = false
    }, 4000)
  },

  close() {
    this.isVisible = false
  }
})
