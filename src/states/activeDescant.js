import { reactive } from 'vue'

export let activeDescant = reactive({
  activeDescantObject: {},

  changeActiveDescant(newPoll) {
    this.activePollObject = newPoll
  }
})
