<script setup>
import AppButtonLink from '@/components/AppButtonLink.vue'
</script>

<template>
  <AppButtonLink type="tertiary" @click="handleSignOut">{{
    $t('general.logOut')
  }}</AppButtonLink>
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
  components: [AppButtonLink]
}
</script>

<style scoped></style>
