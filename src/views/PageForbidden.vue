<script setup>
import AllButtonLink from '@/components/AllButtonLink.vue'
</script>
<template>
  <div class="grid place-items-center p-2 h-screen">
    <div class="text-center">
      <span
        class="bevan mb-5 text-9xl tracking-wider text-red-600 bg-red-200 inline-block px-8 py-2 rounded-full"
        >403</span
      >
      <h1 class="text-gray-500 text-lg mb-4">
        Pre prístup na túto stránku sa musíte prihlásiť.
      </h1>
      <AllButtonLink tag="RouterLink" type="tertiary" to="/signin"
        >Prihlásenie</AllButtonLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageForbidden',
  components: [AllButtonLink]
}
</script>
