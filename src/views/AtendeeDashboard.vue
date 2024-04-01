<script setup>
import { user } from '@/states/userState.js'
// import { socketState, socket } from '@/states/socketState'
import { signIn } from '@/states/signInStates.js'
</script>
<template>
  <div class="px-2 pt-8 sm:p-8 min-h-screen grid items-center justify-center">
    <div class="md:max-w-[50rem]">
      <h1
        class="text-3xl leading-snug sm:leading-[1.2] mb-12 sm:text-5xl bevan text-center text-gray-800"
      >
        Vitajte v hlasovacom systéme MPS 2024
      </h1>
      <div class="flex flex-col items-center">
        <h2
          class="text-center mb-3 text-2xl roboto font-bold text-blue-600 tracking-wider bg-blue-100 rounded-full inline-block px-4 py-1"
        >
          Aktívne Hlasovania
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
            Žiadne aktívne hlasovania
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
    <footer class="shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div class="flex justify-between items-center p-2 pl-4">
        <div class="">
          <p class="text-gray-500 font-medium mb-[-3px]">Prihlásený ako:</p>
          <p class="font-bold text-lg text-gray-800 tracking-wider">
            {{ user.data.email }}
          </p>
        </div>
        <SignOutButton></SignOutButton>
      </div>
    </footer>
  </div>
</template>

<script>
import SignOutButton from '@/components/atendeeDashboard/SignOutButton.vue'
import PollPreview from '@/components/atendeeDashboard/PollPreview.vue'

export default {
  data() {
    return {
      activePolls: [
        {
          number: '4',
          name: 'Zníženie dane z príjmu',
          options: ['Za', 'Proti', 'Vzdávam sa hlasovania']
        }
      ]
    }
  },
  computed: {
    // connected() {
    //   return socketState.connected
    // }
  },
  mounted() {
    console.log(user.data.email)
    // socket.connect()
  },
  components: [SignOutButton, PollPreview]
}
</script>

<style scoped></style>
