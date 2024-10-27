<script setup>
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
import { closeActivePoll } from '@/utils/closePoll.js'
</script>
<template>
  <section
    :key="pollTracking"
    class="bg-white max-w-96 shadow-md rounded-md px-8 py-4 flex flex-col justify-between items-center border border-gray-200"
  >
    <div class="">
      <h2 class="roboto text-3xl font-medium mb-4 text-center">
        Aktívne Hlasovanie
      </h2>
    </div>
    <div
      v-if="activePoll.activePollObject.isActive"
      class="w-full p-4 rounded-md border shadow-sm"
    >
      <span
        class="flex font-semibold bg-red-600 rounded-md p-2 text-xl mb-4 items-center justify-between gap-4 text-white"
      >
        <span class="bg-red-700 px-2 py-1 rounded-md">
          {{ activePoll.activePollObject.number + '.' }}</span
        >
        {{ activePoll.activePollObject.name }}
        <span></span>
      </span>

      <span
        class="mb-4 block text-center font-bold p-3 text-lg roboto border-b"
      >
        {{ getAllVotes || 0 }} hlasov
      </span>
      <div class="flex flex-col gap-6 w-full">
        <PollTrackingVoteDisplay
          v-for="option in activePoll.activePollObject.votes"
          :key="option.title"
          :voteType="{ title: option.title, color: 'green' }"
          :voteNumber="option.numberOfVotes"
        >
        </PollTrackingVoteDisplay>
      </div>
    </div>
    <p
      :key="noActivePollKey"
      class="text-gray-500 roboto italic w-full text-center h-full flex items-center justify-center"
      v-if="
        !activePoll.activePollObject.name ||
        !activePoll.activePollObject.isActive
      "
    >
      Žiadne aktívne hlasovanie
    </p>
    <AppButtonLink
      v-if="activePoll.activePollObject.name"
      type="adminButton"
      @click="handleCloseVote"
      class="w-full mt-4"
      >Ukončiť hlasovanie</AppButtonLink
    >
  </section>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'
import PollTrackingVoteDisplay from '@/components/adminDashboard/PollTrackingVoteDisplay.vue'
const db = getFirestore()
let colRef = collection(db, 'polls')
export default {
  name: 'PollTracking',
  components: {
    AppButtonLink
  },

  data() {
    return {
      pollTracking: 0,
      noActivePollKey: 0
    }
  },

  computed: {
    getAllVotes() {
      return activePoll.activePollObject.votes.reduce((acc, curr) => {
        return acc + curr.numberOfVotes
      }, 0)
    }
  },

  methods: {
    async handleCloseVote() {
      await closeActivePoll()

      //update the view
      setTimeout(() => {
        this.pollTracking++
        this.noActivePollKey++
      }, 1000)
    }
  }
}
</script>

<style scoped></style>
