<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
import { closeActivePoll } from '@/utils/closePoll'
import { activePoll } from '@/states/activePoll.js'
import { activeDescant } from '@/states/activeDescant'
import { db } from '@/main.js'
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
    <div class="flex gap-6">
      <div
        v-if="activeDescant.activeDescantObject.isActive"
        class="flex flex-col gap-6 items-center justify-center h-full"
      >
        <ul
          v-if="activeDescant.activeDescantObject.isActive"
          class="flex min-h-80 w-full flex-col gap-4 bg-gray-100 p-4 max-h-96 overflow-y-scroll rounded-md"
        >
          <!-- No one signed up into the discussion -->
          <div
            v-if="
              activeDescant?.activeDescantObject?.usersSignedUp?.length < 1 ||
              !activeDescant?.activeDescantObject?.usersSignedUp
            "
            class="w-full h-full flex items-center justify-center"
          >
            <span class="text-gray-600 italic"
              >Nikto nie je prihlásený do rozpravy</span
            >
          </div>

          <!-- Users signed up into the discussion -->

          <li
            v-for="(user, index) in activeDescant?.activeDescantObject
              ?.usersSignedUp"
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
                {{ user.userName }}
              </span>
              <p class="text-gray-500 text-sm">
                {{ user.signUpTime }}
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

        <AppButtonLink
          type="adminButton"
          @click="pinDescantToSide()"
          v-if="activeDescant.activeDescantObject.isActive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"
            ></path>
          </svg>
        </AppButtonLink>
      </div>

      <PinnedDescant v-if="pinnedDescant" :descant="pinnedDescant" />
    </div>
  </section>
</template>

<script>
import ViewHeader from '@/components/adminDashboard/ViewHeader.vue'
import { createNewDescantInDatabase } from '@/utils/createDescant.js'
import PinnedDescant from '@/components/adminDashboard/PinnedDescant.vue'
export default {
  name: 'AdminCreateDescant',

  computed: {
    usersSignedUp() {
      if (activeDescant.activeDescantObject) {
        let orderedUsers =
          activeDescant?.activeDescantObject?.usersSignedUp?.sort(
            (a, b) => new Date(a.timeOfSignUp) - new Date(b.timeOfSignUp)
          )
        return orderedUsers
      } else {
        return []
      }
      return []
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

    // if there is an active descant, start listening for changes in votes
    console.log(activeDescant.activeDescantObject, 'activeDescant')
    if (activeDescant.activeDescantObject.isActive) {
      console.log('Listening for sign ups')

      this.listenForSignUps(activeDescant.activeDescantObject.descantId)
    }

    // check if there is a pinned descant
    const pinnedDescant = localStorage.getItem('pinnedDescant')
    if (pinnedDescant) this.pinnedDescant = JSON.parse(pinnedDescant)
  },

  beforeUnmount() {
    if (this.unsubscribeDescant) {
      //unsubscribe from the descant listener
      this.unsubscribeDescant()
    }
  },

  methods: {
    // Listen for changes in the descant signUps
    listenForSignUps(descantId) {
      let newDescantCollectionQuery = query(collection(db, descantId))

      this.unsubscribeDescant = onSnapshot(
        newDescantCollectionQuery,
        (querySnapshot) => {
          console.log('change in sign ups detected')
          if (!querySnapshot.empty) {
            let usersSignedUp = querySnapshot.docs.map((doc) => doc.data())
            activeDescant.updateUsersSignedUp(usersSignedUp)
          }
        }
      )
    },

    // Create a new descant in the database
    async createNewDescant() {
      console.log('Creating a new descant')

      // Check if there is an active poll in the database and close it
      if (
        activePoll?.activePollObject?.isActive ||
        activePoll?.activePollObject?.name
      ) {
        await closeActivePoll()
        console.log('closed the ongoing poll')
      }
      // Create a new descant in the database
      let newDescantId = await createNewDescantInDatabase()

      // kill a descant in case it is active
      if (this.unsubscribeDescant) {
        this.unsubscribeDescant()
      }

      // make the descant active
      activeDescant.changeActiveDescant({
        isActive: true,
        descantId: newDescantId,
        usersSignedUp: []
      })

      console.log('New descant created with ID:', newDescantId)

      // Listen for sign ups
      this.listenForSignUps(newDescantId)
    },

    // Close the active descant
    async closeActiveDescant() {
      try {
        const descantRef = collection(db, 'descants')
        const descantDoc = doc(
          descantRef,
          activeDescant.activeDescantObject.descantId
        )
        await updateDoc(descantDoc, {
          isActive: false
        })

        activeDescant.changeActivityStatus(false)

        console.log('Removing the listener')
        this.unsubscribeDescant()

        console.log('Closing the active descant')
      } catch (error) {
        console.log('An error occured while closing the signUp', error)
      }
    },

    // Pin the descant to the side
    pinDescantToSide() {
      console.log('Pinning the descant to the side')
      // save the descant to local storage through cookies or something
      localStorage.setItem(
        'pinnedDescant',
        JSON.stringify(activeDescant.activeDescantObject)
      )
      // fetch the pinned descant from local storage
      const pinnedDescant = localStorage.getItem('pinnedDescant')
      this.pinnedDescant = JSON.parse(pinnedDescant)
      // show descant on the side
    }
  },

  data() {
    return {
      pinnedDescant: null
    }
  },

  components: {
    ViewHeader,
    PinnedDescant
  }
}
</script>

<style scoped></style>
