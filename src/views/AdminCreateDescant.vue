<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
import { closeActivePoll } from '@/utils/closePoll'
import { activePoll } from '@/states/activePoll.js'
import { activeDescant } from '@/states/activeDescant'
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
</script>
<template>
  <div>
    <AppButtonLink type="adminButton" @click="createNewDescant()"
      >Otvoriť Rozpravu</AppButtonLink
    >
  </div>
  <ul>
    <li
      v-for="(user, index) in activeDescant.activeDescantObject.usersSignedUp"
      :key="index"
    >
      {{ user.name }}
      {{ user.timeOfSignUp }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AdminCreateDescant',

  mounted() {
    // Check if there is an active descant in the database
    // If there is, display it
    // If there isn't, display a message saying there is no active descant
  },

  methods: {
    // Create a new descant in the database
    async createNewDescant() {
      console.log('Creating a new descant')
      if (
        activePoll?.activePollObject?.isActive ||
        activePoll?.activePollObject?.name
      ) {
        await closeActivePoll()
        console.log('closed the ongoing poll')
      }
      // Create a new descant in the database
      // Display the new descant
    },

    // Close the active descant
    async closeActiveDescant() {}
  }
}
</script>

<style scoped></style>
