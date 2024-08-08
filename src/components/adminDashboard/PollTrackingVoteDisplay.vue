<template>
  <div class="flex gap-4 items-center w-full">
    <span
      :class="`font-bold text-lg text-green-600 bg-green-100 py-2 px-4 rounded-sm`"
      >{{ voteNumber }}</span
    >
    <span class="roboto font-medium tracking-wide">{{ voteType.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'PollTrackingVoteDisplay',
  props: {
    voteNumber: {
      type: Number,
      required: true,
      default: 0,
      validator: (value) => {
        return value >= 0
      }
    },
    voteType: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
