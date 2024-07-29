import { reactive } from 'vue'

export const activePoll = reactive({
  title: 'Kto je najlepší programátor?',
  number: 1,
  options: [
    {
      title: 'Filip',
      numberOfVotes: 0
    }
  ]
})
