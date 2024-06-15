<template>
  <ViewHeader subtitle="Sekcia na spravovanie účastníckych profilov"
    >Správa Účastníkov</ViewHeader
  >
  <UserList></UserList>
  <!-- 
  Features needed:
  - list of users
  - reset poslanecky kod
  - send poslanecky kod to email
  - link to firebase auth console
  -->
</template>

<script>
import UserList from '@/components/adminDashboard/UserList.vue'
import ViewHeader from '@/components/adminDashboard/ViewHeader.vue'
export default {
  setup() {
    return {}
  },
  components: {
    ViewHeader,
    UserList
  }
}
</script>

<style lang="scss" scoped></style>
