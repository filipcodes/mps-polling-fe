<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
</script>

<template>
  <div
    :class="[
      'grid transition duration-300 place-items-center p-2 h-screen',
      fadeOut ? 'fade' : ''
    ]"
  >
    <div class="text-center">
      <span
        class="bevan mb-6 text-9xl tracking-wider text-red-600 bg-red-200 inline-block px-8 py-2 rounded-full"
        >404</span
      >
      <h1 class="text-gray-400 text-md mb-10">
        {{ $t('pageNotFound.title') }}
      </h1>
      <div class="grid place-items-center">
        <AppButtonLink
          class="w-fit"
          @click="backToLogin"
          type="tertiary"
          to="/signin"
        >
          <div class="flex items-center fill-gray-700">
            <span> {{ $t('pageNotFound.backToLogin') }} </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"
              ></path>
              <path
                d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"
              ></path>
            </svg>
          </div>
        </AppButtonLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {
      fadeOut: false
    }
  },
  methods: {
    backToLogin() {
      this.fadeOut = true
      setTimeout(() => {
        this.$router.push('/signIn')
      }, 350)
    }
  },
  components: [AppButtonLink]
}
</script>

<style scoped>
.fade {
  opacity: 0;
}
</style>
