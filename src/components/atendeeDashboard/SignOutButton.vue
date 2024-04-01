<script setup>
import ButtonLink from '@/components/ButtonLink.vue'
</script>
<template>
  <ButtonLink type="tertiary" @click="handleSignOut">Odhlásiť sa</ButtonLink>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  name: 'SignOutButton',
  methods: {
    handleSignOut() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.$router.push('/signin')
          console.log('signedOut')
        })
        .catch((error) => {
          console.log('Error signing out', error)
        })
    }
  },
  components: [ButtonLink]
}
</script>

<style scoped></style>
