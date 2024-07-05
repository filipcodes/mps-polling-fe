<script setup>
import { signIn } from '@/states/signInStates'
</script>
<template>
  <AppButtonLink
    class="mb-2 w-full flex items-center justify-center"
    @click="handleSignIn"
  >
    <transition-group tag="div" class="min-h-7" name="fadebutton">
      <svg
        class="spin absolute top-1/2 left-1/2"
        v-if="isVerifyingUser"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
        ></path>
      </svg>
      <span class="bevan text-lg" v-else="isVerifyingUser">Prihlásiť sa</span>
    </transition-group>
  </AppButtonLink>
</template>

<script>
import AppButtonLink from '@/components/AppButtonLink.vue'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'SignInButton',
  data() {
    return {
      isVerifyingUser: false
    }
  },
  methods: {
    async handleSignIn() {
      // Animation
      this.isVerifyingUser = true
      signIn.errorMessage = null

      try {
        // Try signing user in
        await this.signUserIn()

        // if successful, wait so that user can see the animation c;
        setTimeout(() => {
          // route to dashboard
          this.$router.push('/dashboard')

          // end animation
          this.isVerifyingUser = false
        }, 800)
      } catch (error) {
        setTimeout(() => {
          // end animation
          this.isVerifyingUser = false
        }, 400)
      }
    },

    signUserIn() {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(getAuth(), signIn.email, signIn.password)
          .then((data) => {
            resolve(true)
          })
          .catch((error) => {
            console.log(error.code)
            let errorText = ''
            switch (error.code) {
              case 'auth/invalid-credential':
                signIn.errorMessage = 'Zadané prihlasovacie údaje sú nesprávne.'
                break
              case 'auth/internal-error':
                signIn.errorMessage = 'Prepáčťe. Nastala interná chyba.'
                break
              case 'auth/invalid-email':
                signIn.errorMessage = 'Zadaný email nie je v správnom formáte.'
                break
              case 'auth/wrong-password':
                signIn.errorMessage = 'Zadané heslo nie je správne.'
                break
              case 'auth/wrong-password':
                signIn.errorMessage =
                  'Prepáčte. Nepodarilo sa pripojiť ku serveru.'
                break
              case 'auth/user-cancelled':
                signIn.errorMessage = 'Prepáčte. Tento účet bol zrušený.'
                break
              case 'auth/user-not-found':
                signIn.errorMessage = 'Prepáčte. Tento účet neexistuje.'
                break
              default:
                signIn.errorMessage = 'Prepáčte. Nastala chyba.'
                break
            }
            reject(error)
          })
      })
    }
  }
}
</script>

<style scoped>
.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.fadebutton-enter-active,
.fadebutton-leave-active {
  transition: all 0.3s ease;
}

.fadebutton-enter-active {
  transition-delay: 0.3s;
}

.fadebutton-enter-from,
.fadebutton-leave-to {
  opacity: 0;
}
</style>
