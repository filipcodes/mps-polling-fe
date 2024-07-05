<script setup>
import { alert } from '@/states/bottomAlert.js'
</script>

<template>
  <transition name="appear">
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
      <AppButtonLink type="alertClose" class="text-md" @click="alert.close()">
        Zavrieť
      </AppButtonLink>
    </div>
  </transition>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'

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
  components: {
    AppButtonLink
  }
}
</script>

<style scoped>
.appear-enter-active {
  transition: all 0.3s ease;
}

.appear-leave-active {
  transition: all 0.3s ease;
}

.appear-enter-from,
.appear-leave-to {
  transform: translateY(20px) translateX(-50%);
  opacity: 0;
}
</style>
