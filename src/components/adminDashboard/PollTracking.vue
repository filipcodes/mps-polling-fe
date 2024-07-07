<script setup>
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  setDoc
} from 'firebase/firestore'
</script>
<template>
  <section
    class="bg-white shadow-md rounded-md px-8 py-8 pb-4 flex flex-col justify-between items-center border border-gray-200"
  >
    <h2 class="roboto text-3xl font-medium mb-4 text-center">
      Aktualne Hlasovanie
    </h2>
    <span class="font-medium text-lg mb-4">
      {{ getActivePoll.name }}
    </span>

    <span class="mb-4"> {{ getActivePoll.activeVotes }} hlasov </span>
    <div class="grid grid-cols-3 gap-6 justify-center w-full mb-8">
      <div class="flex flex-col items-center w-full">
        <span
          class="font-bold text-lg text-green-600 bg-green-100 py-2 px-4 rounded-sm"
          >{{ getActivePoll.votesFor }}</span
        >
        <span>Za</span>
      </div>
      <div class="flex flex-col items-center w-full">
        <span
          class="font-bold text-lg text-red-600 bg-red-100 py-2 px-4 rounded-sm"
          >{{ getActivePoll.votesAgainst }}</span
        >
        <span>Proti</span>
      </div>
      <div class="flex flex-col items-center w-full">
        <span
          class="font-bold text-lg text-gray-600 bg-gray-100 py-2 px-4 rounded-sm"
          >{{ getActivePoll.votesGaveUp }}</span
        >
        <span>Vzdalo sa</span>
      </div>
    </div>

    <AppButtonLink @click="handleCloseVote" class="w-full mt-4"
      >Ukončiť hlasovanie</AppButtonLink
    >
  </section>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'

const db = getFirestore()
let colRef = collection(db, 'polls')
export default {
  name: 'PollTracking',
  props: {
    getActivePoll: {
      type: Object,
      required: true
    }
  },
  computed: {
    getActivePoll() {
      const noPoll = {
        name: 'No Active Poll',
        activeVotes: 0,
        votesFor: 0,
        votesAgainst: 0,
        votesGaveUp: 0
      }
      return this.getActivePoll ? this.getActivePoll : noPoll
    }
  },
  components: {
    AppButtonLink
  },
  methods: {
    async handleCloseVote() {
      const pollDocRef = doc(colRef, this.getActivePolls[0].id)

      await updateDoc(pollDocRef, {
        isActive: false
      })

      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  }
}
</script>

<style scoped></style>
