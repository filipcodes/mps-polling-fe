import { reactive } from 'vue'

export let activeDescant = reactive({
  activeDescantObject: {},

  changeActiveDescant(newDescant) {
    this.activeDescantObject = newDescant
  },

  updateUsersSignedUp(newUsers) {
    this.activeDescantObject.usersSignedUp = newUsers
  },

  changeActivityStatus(newStatus) {
    if (typeof newStatus !== 'boolean') {
      throw new Error(
        'Activity status passed to the activeDescant must be a boolean value'
      )
    }
    this.activeDescantObject.isActive = newStatus
  }
})
