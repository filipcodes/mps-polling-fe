import { reactive } from 'vue'

export let activeDescant = reactive({
  activeDescantObject: {},

  changeActiveDescant(newDescant) {
    this.activeDescantObject = newDescant
  }
})
