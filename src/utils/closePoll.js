import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore'
import { activePoll } from '@/states/activePoll.js'

export const closeActivePoll = async () => {
  const db = getFirestore()
  let colRef = collection(db, 'polls')

  const pollRef = doc(colRef, activePoll.activePollObject.id)

  await updateDoc(pollRef, {
    isActive: false
  })

  const updatedPollDoc = await getDoc(pollRef)
  activePoll.changeActivePoll(updatedPollDoc.data())
}
