<script setup>
import { mdiMagnify } from '@mdi/js'
import { mdiContentCopy } from '@mdi/js'
import { mdiEmailFast } from '@mdi/js'
import { mdiRefresh } from '@mdi/js'
</script>
<template>
  <div class="shadow-md rounded-xl overflow-hidden">
    <!-- TABLE HEADER -->
    <header
      class="border-b bg-red-700 text-red-100 font-medium shadow-md roboto tracking-wide border-gray-200 p-4 pb-2"
    >
      <div
        class="flex items-center rounded-md overflow-hidden bg-white p-2 gap-2 mb-4"
      >
        <svg-icon type="mdi" :path="mdiMagnify" class="text-gray-400" />
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Vyhľadávanie..."
          class="w-full outline-none focus:shadow-none text-gray-700"
        />
      </div>
      <div class="table-grid text-sm">
        <span>Meno</span>
        <span>Email</span>
        <span>Strana</span>
        <span>Výbor</span>
        <span>Poslanecký Kód</span>
        <span class="text-center">Akcie</span>
      </div>
    </header>

    <!-- LIST OF USERS -->
    <ul class="overflow-x-scroll max-h-96 text-gray-700">
      <UserListEntry
        v-for="(userObject, index) in filteredUsers"
        :key="index"
        :user="userObject"
      ></UserListEntry>
    </ul>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import UserListEntry from '@/components/adminDashboard/UserListEntry.vue'

export default {
  data() {
    return {
      searchTerm: '',
      users: [
        {
          name: 'Filip Šipoš',
          email: 'filip.sipos@student.leaf.academy',
          party: 'Pravicová',
          committee: 'Zahraničný',
          code: '111111'
        },
        {
          name: 'Adam Solár',
          email: 'adam.solar@student.leaf.academy',
          party: 'Pravicová',
          committee: 'Zahraničný',
          code: '666666'
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          party: 'Independent',
          committee: 'Finance',
          code: '123456'
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          party: 'Republican',
          committee: 'Education',
          code: '234567'
        },
        {
          name: 'John Smith',
          email: 'john.smith@example.com',
          party: 'Democrat',
          committee: 'Healthcare',
          code: '345678'
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          party: 'Green Party',
          committee: 'Environment',
          code: '456789'
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          party: 'Independent',
          committee: 'Finance',
          code: '567890'
        },
        {
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          party: 'Republican',
          committee: 'Education',
          code: '678901'
        },
        {
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          party: 'Democrat',
          committee: 'Healthcare',
          code: '789012'
        },
        {
          name: 'Emily Brown',
          email: 'emily.brown@example.com',
          party: 'Green Party',
          committee: 'Environment',
          code: '890123'
        },
        {
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          party: 'Independent',
          committee: 'Finance',
          code: '901234'
        },
        {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          party: 'Republican',
          committee: 'Education',
          code: '012345'
        }
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  components: {
    SvgIcon,
    UserListEntry
  }
}
</script>

<style>
.table-grid {
  display: grid;
  grid-template-columns:
    minmax(120px, 15%) 28% minmax(105px, 14%) minmax(105px, 14%)
    1fr 10%;
}
</style>
