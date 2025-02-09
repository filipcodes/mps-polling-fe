import { db } from '@/main.js'
import { user } from '@/states/userState'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

export const createNewDescantInDatabase = async () => {
  try {
    // get a reference to the descants collection
    const descantCollectionRef = collection(db, 'descants')

    // create a new descant object
    const newDescant = getNewDescantDocumentObject()

    // add a document to the /descants collection
    await setDoc(doc(descantCollectionRef, newDescant.descantId), newDescant)

    return newDescant.descantId
  } catch (error) {
    console.error('Error creating new descant in database')
    console.error(error)
  }
}

const getNewDescantDocumentObject = () => {
  const newDescant = {
    isActive: true,
    descantId: getRandomDescantId()
  }
  console.log(
    newDescant,
    'newDescant from the getNewDescantDocumentObject function'
  )
  return newDescant
}

//   Generates a unique random identifier for a descant.
//   @returns {string} A string starting with 'DSCNT' followed by a random number between 0 and 9999999.
//   @example
//   returns something like "DSCNT1234567"
//   const id = getRandomDescantId();

const getRandomDescantId = () => {
  // generate a random descant ID (starting with 'DSCNT') and check if it already exists
  let descantId = 'DSCNT' + Math.floor(Math.random() * 10000000)

  // return the Id
  return descantId
}
