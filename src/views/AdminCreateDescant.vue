<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
import { closeActivePoll } from '@/utils/closePoll'
import { activePoll } from '@/states/activePoll.js'
import { activeDescant } from '@/states/activeDescant'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  getDocs
} from 'firebase/firestore'
</script>
<template>
  <ViewHeader>Rozprava</ViewHeader>
  <section class="">
    <div
      v-if="!activeDescant.activeDescantObject.isActive"
      class="h-94 w-full flex items-center justify-center"
    >
      <AppButtonLink type="adminButton" @click="createNewDescant()"
        >Otvoriť Rozpravu</AppButtonLink
      >
    </div>
    <div
      v-if="activeDescant.activeDescantObject.isActive"
      class="flex flex-col gap-6 items-center justify-center h-full"
    >
      <ul
        v-if="activeDescant.activeDescantObject.isActive"
        class="flex min-h-80 w-full flex-col gap-4 bg-gray-100 p-4 max-h-96 overflow-y-scroll rounded-md"
      >
        <div
          v-if="usersSignedUp.length < 1"
          class="w-full h-full flex items-center justify-center"
        >
          <span class="text-gray-600 italic"
            >Nikto nie je prihlásený do rozpravy</span
          >
        </div>
        <li
          v-for="(user, index) in usersSignedUp"
          :key="index"
          class="border flex gap-6 bg-white border-gray-200 p-2 rounded-md shadow-sm"
        >
          <div class="flex justify-center items-center">
            <span
              class="font-bold text-xl bg-red-200 py-2 px-3 rounded-md text-red-700"
              >{{ index + 1 }}</span
            >
          </div>
          <div class="">
            <span class="font-bold text-lg">
              {{ user.name }}
            </span>
            <p class="text-gray-500 text-sm">
              {{ user.timeOfSignUp }}
            </p>
          </div>
        </li>
      </ul>
      <AppButtonLink
        v-if="activeDescant.activeDescantObject.isActive"
        type="adminButton"
        @click="closeActiveDescant()"
        >Zatvoriť Rozpravu</AppButtonLink
      >
    </div>
  </section>
</template>

<script>
import ViewHeader from '@/components/adminDashboard/ViewHeader.vue'
export default {
  name: 'AdminCreateDescant',

  data() {
    return {
      descantListener: null
    }
  },

  computed: {
    usersSignedUp() {
      // let filterUniqueUsers =
      //   activeDescant.activeDescantObject.usersSignedUp.filter(
      //     (user, index, self) =>
      //       index === self.findIndex((t) => t.email === user.email)
      //   )

      let orderedUsers = activeDescant.activeDescantObject.usersSignedUp.sort(
        (a, b) => new Date(a.timeOfSignUp) - new Date(b.timeOfSignUp)
      )
      return orderedUsers
    }
  },
  async mounted() {
    // Check if there is an active descant in the database
    const db = getFirestore()
    const descantRef = collection(db, 'descants')
    const q = query(descantRef, where('isActive', '==', true))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      let descant = doc.data()
      activeDescant.changeActiveDescant(descant)
    })

    // start awaiting change in the descant
    if (activeDescant.activeDescantObject.isActive) {
      if (this.descantListener) {
        this.descantListener()
      }
      const unsub = onSnapshot(doc(descantRef, 'descant'), (doc) => {
        console.log('creating a listener')
        if (doc.exists()) {
          activeDescant.changeActiveDescant(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      this.descantListener = unsub
    }
  },

  beforeUnmount() {
    if (this.descantListener) {
      console.log('closing the listener')
      this.descantListener()
    }
  },

  methods: {
    // Create a new descant in the database
    async createNewDescant() {
      console.log('Creating a new descant')

      // Check if there is an active descant in the database and close it
      if (
        activePoll?.activePollObject?.isActive ||
        activePoll?.activePollObject?.name
      ) {
        await closeActivePoll()
        console.log('closed the ongoing poll')
      }
      // Create a new descant in the database
      const db = getFirestore()
      const descantRef = collection(db, 'descants')
      const newDescant = {
        isActive: true,
        usersSignedUp: []
      }
      const docRef = await setDoc(doc(descantRef, 'descant'), newDescant)
      // start awaiting change in the descant
      if (this.descantListener) {
        this.descantListener()
      }

      const unsub = onSnapshot(doc(descantRef, 'descant'), (doc) => {
        console.log('creating a listener')
        if (doc.exists()) {
          activeDescant.changeActiveDescant(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      this.descantListener = unsub
    },

    // Close the active descant
    async closeActiveDescant() {
      console.log('Closing the active descant')
      console.log('Removing the listener')
      this.descantListener()
      const db = getFirestore()
      const descantRef = collection(db, 'descants')
      const descantDoc = doc(descantRef, 'descant')
      await updateDoc(descantDoc, {
        isActive: false
      })

      activeDescant.changeActiveDescant({
        isActive: false,
        usersSignedUp: []
      })
    }
  }
}
</script>

<style scoped></style>
