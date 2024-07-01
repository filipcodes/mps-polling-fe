<template>
  <div class="flex flex-col justify-between h-full">
    <ViewHeader subtitle="Sekcia na spravovanie účastníckych profilov"
      >Správa Účastníkov</ViewHeader
    >
    <UserList></UserList>
  </div>
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

<style scoped></style>
