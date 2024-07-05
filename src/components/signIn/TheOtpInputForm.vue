<script setup>
import { signIn } from '@/states/signInStates'
</script>
<template>
  <div :class="['transition duration-300 opacity-0', fadeIn ? 'fadeIn' : '']">
    <header class="text-center mb-5">
      <h2 class="text-3xl font-bold bevan mb-1">Poslanecký Kód</h2>
      <p class="roboto text-gray-600 max-w-80 mb-2">
        Kód Vám bol daný pri registrácii na konferenciu.
      </p>
      <transition name="fade">
        <p
          class="text-red-600 bg-red-100 border border-red-200 rounded-md py-1"
          v-if="signIn.errorMessage"
        >
          {{ signIn.errorMessage }}
        </p>
      </transition>
    </header>
    <div class="mb-5">
      <v-otp-input
        input-classes="otp-input"
        separator=""
        inputType="password"
        :num-inputs="6"
        v-model:value="signIn.password"
        :should-auto-focus="true"
        :should-focus-order="true"
        @on-complete="focusSignInButton"
      ></v-otp-input>
    </div>
    <SignInButton id="signInBtn"></SignInButton>
    <div class="flex justify-center">
      <AppButtonLink type="underlined" @click="signIn.signInStep = 0">
        Spať ku emailu
      </AppButtonLink>
    </div>
  </div>
</template>

<script>
import SignInButton from '@/components/signIn/SignInButton.vue'
import AppButtonLink from '@/components/AppButtonLink.vue'

export default {
  data() {
    return {
      fadeIn: false
    }
  },
  methods: {
    focusSignInButton() {
      setTimeout(() => {
        this.$el.querySelector('#signInBtn').focus()
      }, 1)
    }
  },
  mounted() {
    this.fadeIn = true
  },
  components: { SignInButton }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadeIn {
  opacity: 1;
}
</style>
