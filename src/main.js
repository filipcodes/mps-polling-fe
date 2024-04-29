// Vue Setup and styles
import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import VOtpInput from 'vue3-otp-input'
import { registerPlugins } from '@/plugins'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// User State Manager
import { user } from '@/states/userState.js'

const app = createApp(App)

registerPlugins(app)

app.config.performance = true
app.component('v-otp-input', VOtpInput).mount('#app')

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: 'AIzaSyAsSNxlNkyP9YY5kLGlm2_0lPrRqjLUm2g',

  authDomain: 'mps-voting-system.firebaseapp.com',

  projectId: 'mps-voting-system',

  storageBucket: 'mps-voting-system.appspot.com',

  messagingSenderId: '863754264164',

  appId: '1:863754264164:web:c3462a26f1a422f695c971',

  measurementId: 'G-R1C2Z94GGY'
}

const FirebaseApp = initializeApp(firebaseConfig)

const analytics = getAnalytics(FirebaseApp)

export const db = getFirestore(FirebaseApp)

export const auth = getAuth()

// whenever signIn is detected, add user to state manager
onAuthStateChanged(auth, (detectedUser) => {
  if (detectedUser) {
    user.setSignedIn(true)
    user.setUser(detectedUser)
    console.log('User signed in')
    console.log(detectedUser)
  } else {
  }
})
