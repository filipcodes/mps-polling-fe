<script setup>
import { user } from '@/states/userState.js'
import { getAuth, updateProfile } from 'firebase/auth'

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  getDoc,
  doc
} from 'firebase/firestore'
import { signIn } from '@/states/signInStates.js'
import { alert } from '@/states/bottomAlert'
</script>
<template>
  <div class="px-2 pt-8 sm:p-8 min-h-screen grid items-center justify-center">
    <div class="md:max-w-[50rem]">
      <h1
        class="text-3xl leading-snug sm:leading-[1.2] mb-12 sm:text-5xl bevan text-center text-gray-800"
      >
        {{ $t('attendee.welcomeMessage') }}
      </h1>
      <div class="flex w-full justify-center align-center"></div>
      <div class="flex flex-col items-center">
        <div class="flex justify-between items-center w-full mb-2">
          <h2
            class="text-center text-lg md:text-2xl bevan font-bold text-blue-600 tracking-wider bg-blue-100 rounded-full inline-block px-4 py-1"
          >
            {{ $t('attendee.activePolls.title') }}
          </h2>
          <AppButtonLink
            :type="currentlyActiveDescantId ? 'primary' : 'tertiary'"
            @click="signUpForDescant(currentlyActiveDescantId)"
            >Hlásiť sa</AppButtonLink
          >
        </div>
        <ul
          :class="[
            'flex flex-col gap-3 bg-gray-200 p-2 w-full rounded-md min-h-96',
            !activePolls[0] ? 'items-center justify-center' : ''
          ]"
        >
          <p
            class="w-fit h-full text-sm font-bold tracking-wider md:text-lg text-gray-600"
            v-if="!activePolls[0]"
          >
            {{ $t('attendee.activePolls.noActivePolls') }}
          </p>
          <PollPreview
            v-if="activePolls[0]"
            v-for="(poll, index) in activePolls"
            :key="index"
            :poll="poll"
          ></PollPreview>
        </ul>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row w-full gap-4">
      <footer
        class="w-full shadow-lg rounded-lg overflow-hidden border border-gray-200"
      >
        <div class="flex justify-between items-center p-2 pl-4">
          <div class="">
            <p class="text-gray-500 font-medium mb-[-3px]">
              {{ $t('attendee.loggedInAs') }}:
            </p>
            <p
              class="font-bold text-lg text-gray-800 tracking-wider text-ellipsis max-w-48 overflow-hidden"
            >
              {{ user.data.email }}{{ user.data.email }}
            </p>
          </div>
          <SignOutButton></SignOutButton>
        </div>
      </footer>
      <AppChangeLanguageButton></AppChangeLanguageButton>
    </div>
  </div>
</template>

<script>
import SignOutButton from '@/components/atendeeDashboard/SignOutButton.vue'
import PollPreview from '@/components/atendeeDashboard/PollPreview.vue'
import AppChangeLanguageButton from '@/components/AppChangeLanguageButton.vue'
import AppButtonLink from '@/components/AppButtonLink.vue'
import { db } from '@/main.js'

export default {
  data() {
    return {
      activePolls: [],
      currentlyActiveDescantId: null
    }
  },

  mounted() {
    const db = getFirestore()

    const colRef = collection(db, 'polls')

    const q = query(colRef, where('isActive', '==', true))
    const descantQuerry = query(
      collection(db, 'descants'),
      where('isActive', '==', true)
    )

    // display activePolls on change
    this.unsubscribePolls = onSnapshot(q, (querySnapshot) => {
      const polls = []
      querySnapshot.forEach((doc) => {
        polls.push(doc.data())
      })

      this.activePolls = polls
    })

    this.unsubscribeDescants = onSnapshot(descantQuerry, (querySnapshot) => {
      if (querySnapshot.empty) {
        this.currentlyActiveDescantId = null
        return
      }
      querySnapshot.forEach((doc) => {
        console.log(doc.data(), 'newly active descant')
        // make descant available
        this.currentlyActiveDescantId = doc.data().descantId
        console.log(this.currentlyActiveDescantId, 'currentlyActiveDescantId')
      })
    })
  },

  unmounted() {
    if (this.unsubscribePolls) this.unsubscribePolls()
    if (this.unsubscribeDescants) this.unsubscribeDescants()
  },

  methods: {
    async signUpForDescant(descantId) {
      if (!user.data.displayName) {
        let newDisplayName = ''

        // get user name from firestore
        const userRef = collection(db, 'users')
        const q = query(userRef, where('email', '==', user.data.email))
        console.log('-----------------', user.data.email)
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          newDisplayName = doc.data().name
        })

        //update user name in auth
        const auth = getAuth()

        await updateProfile(auth.currentUser, {
          displayName: newDisplayName
        })

        // get new user data from auth
        const newUser = auth.currentUser

        user.setUser(newUser)
      }

      // sign user up for descant

      if (!this.currentlyActiveDescantId) {
        alert.error('Hlásenie nie je možné')
        return
      }

      //check if the user is already signed up
      const signedUpRef = doc(db, this.currentlyActiveDescantId, user.data.uid)
      const signedUpDoc = await getDoc(signedUpRef)

      if (signedUpDoc.exists()) {
        alert.error('Už ste prihlásený')
        return
      }

      // Query the collection with the key of descant ID
      await setDoc(doc(db, this.currentlyActiveDescantId, user.data.uid), {
        userName: user.data.displayName,
        signUpTime: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 1,
          hour12: false
        })
      })

      alert.success('Prihlásenie úspešné')
    }
  },
  components: [SignOutButton, PollPreview, AppChangeLanguageButton]
}
</script>

<style scoped></style>
