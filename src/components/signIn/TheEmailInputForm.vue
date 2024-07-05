<script setup>
import { signIn } from '@/states/signInStates'
</script>
<template>
  <div :class="['transition duration-300 ease-out', fadeOut ? 'fadeOut' : '']">
    <header class="pb-7 text-center flex flex-col items-center justify-center">
      <h2 class="text-3xl font-bold bevan mb-1">Vitajte Poslanci!</h2>
      <p class="roboto text-gray-600 max-w-80">
        Pre prístup ku hlasovaciemu systému MPS 2024 sa prihláste emailom a
        poslaneckým kódom.
      </p>
    </header>
    <form @submit.prevent>
      <div class="mb-3">
        <input
          required
          autofocus
          class="text-lg bg-gray-100 border-2 outline-none px-4 py-2 rounded-md w-full transition duration-300 ease-out"
          id="emailInput"
          type="email"
          v-model="signIn.email"
          placeholder="Emailová adresa"
          @input="validateEmail"
        />
      </div>

      <AppButtonLink class="w-full" @click="validateEmailandNavigate()"
        >Pokračovať</AppButtonLink
      >
    </form>
  </div>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'
export default {
  data() {
    return {
      fadeOut: false
    }
  },
  methods: {
    validateEmailandNavigate() {
      // validate the email against an array of existing emails from the database
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(signIn.email)) {
        console.log('Invalid Email')
        return
      }
      console.log('Email valid')

      // If that succeeds, navigate to next page of SignIn
      this.fadeOut = true
      setTimeout(() => {
        signIn.signInStep = 1
      }, 300)
    }
  },
  components: [AppButtonLink]
}
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 4px #3b83f681;
}

.fadeOut {
  opacity: 0;
}
</style>
