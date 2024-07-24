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
    class="bg-white shadow-md rounded-md px-8 py-4 flex flex-col justify-between items-center border border-gray-200"
  >
    <div class="">
      <h2 class="roboto text-3xl font-medium mb-4 text-center">
        Aktívne Hlasovanie
      </h2>
    </div>
    <div class="w-full p-4 rounded-md border shadow-sm">
      <span
        class="flex font-semibold bg-red-600 rounded-md p-2 text-xl mb-4 items-center justify-between gap-4 text-white"
      >
        <span class="bg-red-700 px-2 py-1 rounded-md">
          {{ getActivePoll.number + '.' }}</span
        >
        {{ getActivePoll.name }}
        <span></span>
      </span>

      <span
        class="mb-4 block text-center font-bold p-3 text-lg roboto border-b"
      >
        {{ getActivePoll.activeVotes || 0 }} hlasov
      </span>
      <div class="flex flex-col gap-6 w-full">
        <!-- TODO: ENENTUALLY JUST GENERATE THIS THOURGH A V-FOR LOOP -->
        <PollTrackingVoteDisplay
          :voteNumber="getActivePoll.votesFor"
          :voteType="voteTypes.for"
        ></PollTrackingVoteDisplay>
        <PollTrackingVoteDisplay
          :voteNumber="getActivePoll.votesAgainst"
          :voteType="voteTypes.against"
        ></PollTrackingVoteDisplay>
        <PollTrackingVoteDisplay
          :voteNumber="getActivePoll.votesGaveUp"
          :voteType="voteTypes.gaveUp"
        ></PollTrackingVoteDisplay>
      </div>
    </div>
    <AppButtonLink
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
  props: {
    activePoll: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      voteTypes: {
        for: {
          title: 'Za',
          color: 'green'
        },
        against: {
          title: 'Proti',
          color: 'red'
        },
        gaveUp: {
          title: 'Vzdal sa hlasovania',
          color: 'gray'
        }
      }
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
      return this.activePoll ? this.activePoll : noPoll
    }
  },
  components: {
    AppButtonLink
  },
  methods: {
    async handleCloseVote() {
      const pollDocRef = doc(colRef, this.activePoll.id)

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
