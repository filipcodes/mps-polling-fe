import { db } from '@/main'
import { user } from '@/states/userState'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

//rename to syncUsername of FirebaseAuth and firebase
export const setUserNameInFirebaseAuth = async (userName) => {
  try {
    //check if the username has been set already, if yes, return
    // if not, get username from firestore
    // if there is none, return with an error
    // if there is, set the firebase username to that
  } catch (error) {
    console.log('error setting the username in firebase auth')
    console.log(error)
  }
}

const getUserNameFromFireStore = async () => {
  let newDisplayName = ''

  // get user name from firestore
  const usersCollectionRef = collection(db, 'users')
  const q = query(usersCollectionRef, where('email', '==', user.data.email))
  console.log('-----------------', user.data.email)
  const querySnapshot = await getDocs(q)
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    newDisplayName = doc.data().name
  })
}
