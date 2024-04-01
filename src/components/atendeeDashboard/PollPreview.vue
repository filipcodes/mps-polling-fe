<script setup>
import ButtonLink from '@/components/ButtonLink.vue'
// import { socketState, socket } from '@/states/socketState'
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
      <ButtonLink
        :type="selected ? 'primary' : 'inactive'"
        class="w-full sm:w-fit"
        @click="handleVote"
      >
        <div class="flex items-center gap-3 justify-center bevan">
          Hlasovať
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-8 w-8"
          >
            <title>Hlasovať</title>
            <path
              class=""
              d="M18,13H17.32L15.32,15H17.23L19,17H5L6.78,15H8.83L6.83,13H6L3,16V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V16L18,13M17,7.95L12.05,12.9L8.5,9.36L13.46,4.41L17,7.95M12.76,2.29L6.39,8.66C6,9.05 6,9.68 6.39,10.07L11.34,15C11.73,15.41 12.36,15.41 12.75,15L19.11,8.66C19.5,8.27 19.5,7.64 19.11,7.25L14.16,2.3C13.78,1.9 13.15,1.9 12.76,2.29Z"
            />
          </svg>
        </div>
      </ButtonLink>
    </div>
    <div class="grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 w-full">
      <ButtonLink
        v-for="option in poll.options"
        type="pollOption"
        @click="selected = option"
        :class="[
          selected === option ? 'outline-2 outline-blue-700 shadow-blue' : '',
          'last:col-span-2 last:sm:col-span-1'
        ]"
        >{{ option }}</ButtonLink
      >
    </div>
  </li>
</template>

<script>
export default {
  name: 'PollPreview',
  data() {
    return {
      selected: ''
    }
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleVote() {
      // socket.emit('vote', this.selected, () => {
      //   console.log('callback!')
      // })
    }
  },
  components: [ButtonLink]
}
</script>

<style scoped>
.shadow-blue {
  box-shadow: 0 0 0 4px #3b83f681;
}
</style>
