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
    console.log(attendees)
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

// let testUser = {
//   email: 'bartekovabibiana@gmail.com',
//   code: '881140',
//   name: 'Bibiana Barteková',
//   committee: 'Komisia kultúrneho rozvoja',
//   party: 'Progresívna pravica'
// }
// setTimeout(async () => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       testUser.email,
//       testUser.code
//     )

//     let user = userCredential.user

//     await setDoc(doc(db, 'users', user.uid), {
//       name: testUser.name,
//       email: testUser.email,
//       code: testUser.code,
//       committee: testUser.committee,
//       party: testUser.party
//     })

//     console.log(`succesfuly created user with email: ${testUser.email}`)
//   } catch (error) {
//     console.error(`error creating user with email: ${testUser.email}`)
//     console.error(error)
//   }
// }, 3000)

setTimeout(async () => {
  for (const attendee of attendees) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        attendee.email,
        attendee.code
      )

      let user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        name: attendee.name,
        email: attendee.email,
        code: attendee.code,
        committee: attendee.committee,
        party: attendee.party
      })

      console.log(`succesfuly created user with email: ${attendee.email}`)
    } catch (error) {
      console.error(`error creating user with email: ${attendee.email}`)
      console.error(error)
    }
  }
}, 3000)
