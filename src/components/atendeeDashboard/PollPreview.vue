<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
import PollPreviewVoteButton from './PollPreviewVoteButton.vue'
import { user } from '@/states/userState.js'

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore'

import Cookies from 'js-cookie'
</script>
<template>
  <li
    class="rounded-lg py-2 pl-4 bg-white pr-2 shadow-lg flex items-center justify-between flex-col"
  >
    <div
      class="flex w-full justify-between items-center mb-4 sm:flex-row flex-col"
    >
      <h3
        class="text-xl font-bold flex flex-col mb-4 sm:mb-0 sm:block tracking-wide text-center sm:text-left"
      >
        hlasovanie {{ poll.number }}: <span>{{ poll.name }}</span>
      </h3>

      <PollPreviewVoteButton
        :selectedOption="selectedOption"
        :isActive="isActive"
        @click="handleVote"
      />
    </div>
    <div class="grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 w-full">
      <AppButtonLink
        v-for="option in poll.options"
        :type="isActive ? 'pollOption' : 'inactive'"
        @click="selectedOption = option"
        :class="[
          selectedOption === option
            ? 'outline-2 outline-blue-700 shadow-blue'
            : '',
          'last:col-span-2 last:sm:col-span-1'
        ]"
        >{{ option }}</AppButtonLink
      >
    </div>
  </li>
</template>

<script>
export default {
  name: 'PollPreview',
  data() {
    return {
      selectedOption: '',
      isActive: false
    }
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  },

  async mounted() {
    // this should  check whether it is active. currently, it uses cookies, which is not the best practice

    // See whether the user has voted in the relevant poll by fetching firestore:
    const db = getFirestore()
    const pollRef = collection(db, this.poll.id)
    const q = query(pollRef, where('userId', '==', user.data.uid))
    const querySnapshot = await getDocs(q)
    this.isActive = querySnapshot.empty
    // If yes, set the this.isActive to false, as it should show that the user has already voted

    // If no, set the this.isActive to true, as it should show that the user can vote
  },

  methods: {
    async handleVote() {
      // If the user has not selected an option or the poll is not active, return
      if (!this.selectedOption || !this.isActive) return

      try {
        const db = getFirestore()

        const docRef = doc(collection(db, this.poll.id), user.data.uid) //TODO add user.data.uid after prod
        await setDoc(docRef, {
          pollId: this.poll.id,
          userId: user.data.uid,
          vote: this.selectedOption
        })
        // Set the isActive to false, as the user has voted
        this.isActive = false
        Cookies.set('IsActive', this.isActive, { expires: 7 }) // Expires in 7 days
      } catch (error) {
        console.error('Error handling vote: ', error)
      }
    }
  },

  components: [AppButtonLink, PollPreviewVoteButton]
}
</script>

<style scoped>
.shadow-blue {
  box-shadow: 0 0 0 4px #3b83f681;
}
</style>
