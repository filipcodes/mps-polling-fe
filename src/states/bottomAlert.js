import { reactive } from 'vue'
import { user } from '@/states/userState'
import { doc, addDoc, collection } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

export const alert = reactive({
  isVisible: false,
  text: 'Alert text',
  type: 'success',

  show(text) {
    this.text = text
    this.isVisible = true

    addActionToLog(text)
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

const addActionToLog = async (actionDescription) => {
  console.log('pushing firestore')
  const db = getFirestore()
  await addDoc(collection(db, 'actionLog'), {
    time: new Date().toISOString(),
    description: actionDescription,
    user: user.data.email
  })
}
