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
      <PollTracking :activePoll="activePoll.activePollObject"></PollTracking>
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
      activePolls: null,
      activeVotes: 0
    }
  },
  mounted() {
    const q = query(colRef, where('isActive', '==', true))

    let polls = []
    // display activePolls on change in whatever
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log('change in active polls detected')

        querySnapshot.forEach((doc) => {
          if (doc.data().isActive) {
            polls.push(doc.data())
          }
        })

        if (polls[0]) {
          // there have been changes in active polls
          console.log('there are some actual polls', ':', polls)
          activePoll.changeActivePoll(polls[0])
          console.log(activePoll.activePollObject)
        }

        if (polls[0]) {
          setTimeout(() => {
            var unsubVotes = onSnapshot(collection(db, polls[0].id), (snap) => {
              console.log('change in vote number detected')
              this.activeVotes = snap.size
              let votes = []
              let options = activePoll.activePollObject.options
              for (const option of options) {
                votes.push({
                  title: option,
                  numberOfVotes: 0
                })
              }

              activePoll.activePollObject.votes = votes

              // assign the doc into whichever option meets the title
              snap.forEach((doc) => {
                console.log(doc.data().vote)
                let option = activePoll.activePollObject.votes.find(
                  (opt) => opt.title === doc.data().vote
                )
                option.numberOfVotes++
              })
            })
          }, 1000)
        } else {
          console.log('there is zero active polls')
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
    },

    async handleCloseVote() {
      const pollDocRef = doc(collection(db, 'polls'), this.activePolls[0].id)

      await updateDoc(pollDocRef, {
        isActive: false
      })

      setTimeout(() => {
        location.reload()
      }, 1000)
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
