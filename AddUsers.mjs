'use strict'
import fs from 'fs'
import csv from 'csv-parser'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

// CREATE ATENDEES LIST
const attendees = []

fs.createReadStream('data.csv')
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => header.toLowerCase()
    })
  )
  .on('data', (data) => attendees.push(data))
  .on('end', () => {
    console.log('atendees list created')
  })

// AUTHENTICATE THE ACCOUNTS AND ADD THEM TO THE FIRESTORE DB
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

export const db = getFirestore(FirebaseApp)

const auth = getAuth()

// const testAttendees = [
//   {
//     name: 'Vivien Vamosova',
//     email: 'vivien.vamosova@student.leaf.academy',
//     code: '333333'
//   }
// ]
setTimeout(async () => {
  for (const attendee of attendees) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      attendee.email,
      attendee.code
    )

    console.log(`succesfuly created user with email: ${attendee.email}`)
    let user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      name: attendee.name,
      email: attendee.email,
      code: attendee.code
    })
  }
}, 2000)
