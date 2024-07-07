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
</script>

<template>
  <div class="roboto max-h-screen">
    <ViewHeader>Správa Hlasovania</ViewHeader>
    <div class="flex flex-row gap-12">
      <form
        @submit.prevent="handleCreatePoll"
        @keydown.enter.prevent="console.log('enter')"
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
              type="secondary"
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
              <AppButtonLink class="" @click="handleAddOption">+</AppButtonLink>
            </form>
          </li>
        </ul>
        <AppButtonLink submit class="w-full">Vytvoriť hlasovanie</AppButtonLink>
      </form>

      <ul v-if="activePolls && activePolls[0]" class="min-w-56">
        <li
          class="bg-white shadow-md rounded-md px-8 py-4 flex flex-col justify-between items-center border border-gray-200"
          v-for="(poll, index) in activePolls"
          :key="index"
        >
          <span class="font-medium text-lg mb-4">
            {{ poll.name }}
          </span>

          <span class="mb-4"> {{ activeVotes }} hlasov </span>
          <div class="grid grid-cols-3 gap-6 justify-center w-full mb-8">
            <div class="flex flex-col items-center w-full">
              <span
                class="font-bold text-lg text-green-600 bg-green-100 py-2 px-4 rounded-sm"
                >{{ currentVotesFor }}</span
              >
              <span>Za</span>
            </div>
            <div class="flex flex-col items-center w-full">
              <span
                class="font-bold text-lg text-red-600 bg-red-100 py-2 px-4 rounded-sm"
                >{{ currentVotesAgainst }}</span
              >
              <span>Proti</span>
            </div>
            <div class="flex flex-col items-center w-full">
              <span
                class="font-bold text-lg text-gray-600 bg-gray-100 py-2 px-4 rounded-sm"
                >{{ currentVotesGaveUp }}</span
              >
              <span>Vzdalo sa</span>
            </div>
          </div>

          <AppButtonLink @click="handleCloseVote" class="w-full mt-4"
            >Ukončiť hlasovanie</AppButtonLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/adminDashboard/ViewHeader.vue'

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
      activeVotes: 0,
      currentVotesFor: 0,
      currentVotesAgainst: 0,
      currentVotesGaveUp: 0
    }
  },
  mounted() {
    console.log('mounter')
    const q = query(colRef, where('isActive', '==', true))
    console.log('mounter')

    let polls = []
    // display activePolls on change in whatever
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log('change in active polls detected')

        querySnapshot.forEach((doc) => {
          if (doc.data().isActive) {
            console.log(doc.data())
            polls.push(doc.data())
          }
        })
        if (polls[0] && polls[0].isActive) {
          // there have been changes in active polls
          console.log('there are some actual polls')
          this.activePolls = polls
        }

        if (this.activePolls?.length > 0 && polls[0] && polls[0].isActive) {
          console.log('number of active polls:', this.activePolls.length)
          console.log(this.activePolls[0].id)
          setTimeout(() => {
            var unsubVotes = onSnapshot(
              collection(db, this.activePolls[0].id),
              (snap) => {
                console.log('change in vote number detected')
                this.activeVotes = snap.size
                let votesFor = 0,
                  votesAgainst = 0,
                  votesGaveUp = 0
                snap.forEach((doc) => {
                  if (doc.data().vote === 'Proti') {
                    votesAgainst++
                  } else if (doc.data().vote === 'Za') {
                    votesFor++
                  } else {
                    votesGaveUp++
                  }

                  ;[
                    this.currentVotesFor,
                    this.currentVotesAgainst,
                    this.currentVotesGaveUp
                  ] = [votesFor, votesAgainst, votesGaveUp]
                })
              }
            )
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
      console.log('creating poll')
      const randNum = Math.floor(1000000000 + Math.random() * 9000000000)

      let docRef = doc(collection(db, 'polls'), randNum.toString())
      const newDocRef = await setDoc(docRef, {
        name: this.pollName,
        number: this.pollNumber,
        options: this.pollOptions,
        isActive: true,
        id: randNum.toString(),
        votes: []
      })

      // const uhoh = doc(db, 'polls', newDocRef.id)
      // await updateDoc(uhoh, {
      //   id: newDocRef.id
      // })

      console.log()
    },

    // Option Manipulation
    handleAddOption() {
      this.pollOptions.push(this.newPollOption)
      this.newPollOption = ''
    },
    handleRemoveOption(option) {
      console.log('removing option', option)
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
      console.log('closing vote')

      const pollDocRef = doc(collection(db, 'polls'), this.activePolls[0].id)
      // what happens here?
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

<style scoped>
input {
  transition: all 200ms;
  outline: none;
}
</style>
