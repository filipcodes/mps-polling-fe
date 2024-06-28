<script setup>
import { alert } from '@/states/bottomAlert.js'
</script>

<template>
  <div
    :class="[
      'fixed bottom-4 left-1/2 border border-zinc-300 -translate-x-1/2 flex justify-between items-center shadow-lg bg-white rounded-md p-2 pl-6 text-zinc-600 min-w-72 gap-12 font-medium tracking-wide',
      typeClasses[alert.type]
    ]"
    v-if="alert.isVisible"
  >
    <p class="roboto">
      {{ alert.text }}
    </p>
    <ButtonLink type="alertClose" class="text-md" @click="alert.close()">
      Zavrieť
    </ButtonLink>
  </div>
</template>

<script>
import ButtonLink from '@/components/ButtonLink.vue'

export default {
  name: 'BottomAlert',
  setup() {
    return {}
  },
  computed: {
    typeClasses() {
      return {
        error: 'border-red-300 shadow-red-200',
        success: 'border-green-200 shadow-green-200'
      }
    }
  },
  children: {
    ButtonLink
  }
}
</script>

<style scoped></style>
