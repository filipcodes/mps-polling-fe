<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
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

import { activePoll } from '@/states/activePoll.js'
</script>

<template>
  <div class="roboto max-h-screen">
    <ViewHeader>Správa Hlasovania</ViewHeader>
    <div class="flex flex-row gap-12 justify-center">
      <form
        @submit.prevent="handleCreatePoll"
        @keydown.enter.prevent="console.log('enter pressed')"
        class="shadow-lg p-4 rounded-lg border border-gray-200 max-w-96 text-center"
      >
        <h2 class="roboto text-3xl font-medium mb-4">Vytvoriť Hlasovanie</h2>
        <div class="mb-2">
          <input
            id="pollName"
            class="rounded-md text-lg px-3 py-2 border-2 border-gray-300 w-full"
            v-model="pollName"
            type="text"
            required
            placeholder="Názov hlasovania"
          />
        </div>
        <div class="flex justify-between items-center mb-8">
          <label for="pollNumber" class="font-semibold roboto"
            >Číslo hlasovania:</label
          >
          <input
            v-model="pollNumber"
            @keypress="isNumber($event)"
            min="1"
            max="999"
            type="number"
            required
            id="pollNumber"
            class="rounded-md text-lg px-3 py-2 w-24 border-2 border-gray-300"
          />
        </div>
        <h3 class="roboto text-lg tracking-wide font-medium mb-3 uppercase">
          Možnosti:
        </h3>
        <ul
          class="roboto flex gap-2 flex-col w-full mb-8 items-center max-h-72 p-2 overflow-y-scroll outline-none"
        >
          <li
            v-for="option in pollOptions"
            :key="option"
            class="flex justify-between w-full items-center bg-white text-gray-500 py-2 pl-3 pr-2 rounded-md border-gray-300 shadow-sm border text-lg tracking-wider font-medium"
          >
            {{ option }}
            <AppButtonLink
              is="button"
              type="adminButtonSecondary"
              @click="handleRemoveOption(option)"
              >-</AppButtonLink
            >
          </li>
          <li class="pr-2 w-full">
            <form class="flex items-center gap-3" @click.prevent="">
              <input
                type="text"
                class="border text-lg rounded-md py-3 pl-3 pr-2 border-gray-300 outline-none w-full"
                v-model="newPollOption"
                placeholder="Nová možnosť"
              />
              <AppButtonLink
                class=""
                type="adminButton"
                @click="handleAddOption"
                >+</AppButtonLink
              >
            </form>
          </li>
        </ul>
        <AppButtonLink submit type="adminButton" class="w-full"
          >Vytvoriť hlasovanie</AppButtonLink
        >
      </form>
      <PollTracking :activePoll="activePoll.activePollObject" />
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/adminDashboard/ViewHeader.vue'
import PollTracking from '@/components/adminDashboard/PollTracking.vue'

const db = getFirestore()
let colRef = collection(db, 'polls')
export default {
  name: 'AdminPolls',
  data() {
    return {
      pollNumber: 1,
      pollName: '',
      pollOptions: ['Za', 'Proti', 'Vzdal sa hlasovania'],
      newPollOption: '',
      activeVotes: 0
    }
  },

  mounted() {
    // querry all the polls that are active
    const activePollQuerry = query(colRef, where('isActive', '==', true))

    // display activePolls on change in whatever
    try {
      //create a listener for the active polls, and update the activePolls array
      console.log('setting up the activePolls listener')
      const unsubscribe = onSnapshot(activePollQuerry, (querySnapshot) => {
        console.log('change in active polls detected')

        const activePolls = querySnapshot.docs.map((doc) => doc.data())

        if (activePolls.length > 0) {
          const firstPoll = activePolls[0]

          activePoll.changeActivePoll(firstPoll)

          this.listenForVotes(firstPoll.id)
        } else {
          console.log('there are no active polls')
        }
      })
    } catch (error) {
      console.log('an error occured', error)
    }
  },

  methods: {
    async handleCreatePoll() {
      // poll document ID
      const randNum = Math.floor(1000000000 + Math.random() * 9000000000)

      // create a document for the poll
      let docRef = doc(collection(db, 'polls'), randNum.toString())
      const newDocRef = await setDoc(docRef, {
        name: this.pollName,
        number: this.pollNumber,
        options: this.pollOptions,
        isActive: true,
        id: randNum.toString(),
        votes: []
      })
    },

    listenForVotes(pollId) {
      console.log(`Setting up vote listener for poll ID: ${pollId}`)

      const voteCollectionRef = collection(db, pollId)

      onSnapshot(voteCollectionRef, (snapshot) => {
        console.log('Change in vote number detected')

        this.activeVotes = snapshot.size

        // Initialize vote counts using reduce
        const votes = activePoll.activePollObject.options.map((option) => ({
          title: option,
          numberOfVotes: 0
        }))

        snapshot.forEach((doc) => {
          const voteTitle = doc.data().vote
          const voteOption = votes.find((opt) => opt.title === voteTitle)
          if (voteOption) {
            voteOption.numberOfVotes++
          }
        })

        activePoll.activePollObject.votes = votes
      })
    },

    // Option Manipulation
    handleAddOption() {
      this.pollOptions.push(this.newPollOption)
      this.newPollOption = ''
    },

    handleRemoveOption(option) {
      this.pollOptions = this.pollOptions.filter((opt) => opt !== option)
    },

    isNumber(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      }
    }
  },
  components: {
    PollTracking,
    AppButtonLink
  }
}
</script>

<style scoped>
input {
  transition: all 200ms;
  outline: none;
}
</style>
