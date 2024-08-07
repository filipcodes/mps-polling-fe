<script setup>
import { user } from '@/states/userState.js'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import { signIn } from '@/states/signInStates.js'
</script>
<template>
  <div class="px-2 pt-8 sm:p-8 min-h-screen grid items-center justify-center">
    <div class="md:max-w-[50rem]">
      <h1
        class="text-3xl leading-snug sm:leading-[1.2] mb-12 sm:text-5xl bevan text-center text-gray-800"
      >
        {{ $t('attendee.welcomeMessage') }}
      </h1>
      <div class="flex flex-col items-center">
        <h2
          class="text-center mb-3 text-2xl roboto font-bold text-blue-600 tracking-wider bg-blue-100 rounded-full inline-block px-4 py-1"
        >
          {{ $t('attendee.activePolls.title') }}
        </h2>
        <ul
          :class="[
            'flex flex-col gap-3 bg-gray-200 p-2 w-full rounded-md min-h-96',
            !activePolls[0] ? 'items-center justify-center' : ''
          ]"
        >
          <p
            class="w-fit h-full font-bold tracking-wider text-xl text-gray-800"
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

export default {
  data() {
    return {
      activePolls: []
    }
  },

  mounted() {
    const db = getFirestore()

    const colRef = collection(db, 'polls')

    const q = query(colRef, where('isActive', '==', true))

    // display activePolls on change
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      const polls = []
      querySnapshot.forEach((doc) => {
        polls.push(doc.data())
      })

      this.activePolls = polls
    })
  },
  components: [SignOutButton, PollPreview, AppChangeLanguageButton]
}
</script>

<style scoped></style>
