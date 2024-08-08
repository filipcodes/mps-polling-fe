import { reactive } from 'vue'

export let activePoll = reactive({
  activePollObject: {
    // name: 'Žiadne aktívne hlasovanie',
    // number: 1,
    // options: []
  },

  changeActivePoll(newPoll) {
    this.activePollObject = newPoll
  }
})
