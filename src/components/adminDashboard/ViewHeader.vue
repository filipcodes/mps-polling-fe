<template>
  <header
    class="flex text-gray-800 flex-col justify-center items-center mb-8 mt-6"
  >
    <h1 class="text-4xl mb-2 bevan font-bold tracking-wider">
      <slot></slot>
    </h1>
    <span class="roboto text-sm text-gray-500 uppercase font-medium">{{
      subtitle
    }}</span>
  </header>
</template>

<script>
export default {
  name: 'ViewHeader',
  props: {
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
