<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-4xl mb-2 bevan font-bold tracking-wider">
      <slot></slot>
    </h1>
    <span class="roboto">{{ subtitle }}</span>
  </div>
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
