<script setup>
import { mdiMagnify } from '@mdi/js'
import { mdiLoading } from '@mdi/js'
import { alert } from '@/states/bottomAlert.js'
</script>
<template>
  <div
    class="shadow-md rounded-xl h-[35rem] overflow-hidden mx-6 vertical-grid-table"
  >
    <!-- TABLE HEADER -->
    <header
      class="border-b-2 bg-red-700 text-red-100 font-medium shadow-md roboto tracking-wide border-red-800 p-4 pb-2"
    >
      <div class="flex flex-col gap-2 justify-between items-start mb-6">
        <div
          class="shadow-inner flex w-full max-w-[50%] items-center rounded-md overflow-hidden bg-white p-2 gap-2"
        >
          <svg-icon type="mdi" :path="mdiMagnify" class="text-gray-400" />
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Vyhľadávanie"
            class="w-full outline-none focus:shadow-none text-gray-700"
          />
        </div>
        <span class="text-xs roboto"
          >Nájdených
          <span
            class="bg-white px-2 rounded-md text-gray-600 roboto font-medium"
          >
            {{ filteredUsers.length }}</span
          >
          užívateľov
        </span>
      </div>

      <!-- DESC ROW -->
      <!-- TODO: SHOULD BE GENERATED FROM A LIST -->
      <div class="table-grid roboto text-sm">
        <span class="roboto">
          {{ $t('admin.userManagement.table.name') }}
        </span>
        <span class="roboto">
          {{ $t('admin.userManagement.table.email') }}
        </span>
        <span class="roboto">
          {{ $t('admin.userManagement.table.party') }}
        </span>
        <span class="roboto">
          {{ $t('admin.userManagement.table.committee') }}
        </span>
        <span class="roboto">
          {{ $t('admin.userManagement.table.code') }}
        </span>
        <span class="roboto text-center">
          {{ $t('admin.userManagement.table.actions') }}
        </span>
      </div>
    </header>

    <!--! TABLE OF USERS -->

    <!-- NO USERS FOUND -->
    <div
      v-if="!filteredUsers[0] && !isLoading"
      class="h-full w-full grid content-center"
    >
      <span>
        <p class="text-center text-lg roboto text-gray-500 py-4">
          {{ $t('admin.userManagement.table.noAttendeesFound') }}
        </p>
      </span>
    </div>

    <!-- LOADING -->
    <div
      v-if="isLoading"
      class="h-full w-full flex justify-center items-center"
    >
      <svg-icon
        type="mdi"
        size="56"
        :path="mdiLoading"
        class="animate-spin text-red-700"
      />
    </div>

    <!-- LIST OF USERS IN CASE IT IS FOUND-->
    <ul v-if="!isLoading" class="overflow-x-scroll max-h-[25rem] text-gray-700">
      <UserListEntry
        @deleted-user="refreshTable()"
        v-for="(userObject, index) in filteredUsers"
        :key="index"
        :user="userObject"
        >{{ index }}</UserListEntry
      >
    </ul>

    <!--! BULK ACTIONS -->
    <UserListBulkActions :users="users"></UserListBulkActions>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import UserListEntry from '@/components/adminDashboard/UserListEntry.vue'
import { getFirestore } from 'firebase/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'
import UserListBulkActions from '@/components/adminDashboard/UserListBulkActions.vue'

const db = getFirestore()

export default {
  data() {
    return {
      searchTerm: '',
      users: [],
      errorLoadingUsers: false
    }
  },

  async mounted() {
    this.fetchUsersFromFirestore()
    // this.users = [
    //   {
    //     name: 'Janko Hraško',
    //     email: 'janko@hrasko.com',
    //     code: '123456'
    //   },
    //   {
    //     name: 'Filip Sipos',
    //     email: 'filip.sipos@student.leaf.academy',
    //     code: '654321'
    //   }
    // ]
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        this.removeDiacritics(user.name.toLowerCase()).includes(
          this.removeDiacritics(this.searchTerm.toLowerCase())
        )
      )
    },

    isLoading() {
      return (
        this.users.length === 0 &&
        this.searchTerm === '' &&
        this.errorLoadingUsers === false
      )
    }
  },

  methods: {
    async fetchUsersFromFirestore() {
      try {
        const q = query(collection(db, 'users'))
        const querySnapshot = await getDocs(q)

        setTimeout(() => {
          if (this.users.length === 0) {
            this.errorLoadingUsers = true
            alert.error('Vo Firebase sa nepodarilo nájsť používateľov')
            console.error(
              'Firebase fetch request has not resolved with any users in 5000ms, hence no users found'
            )
          }
        }, 5000)

        setTimeout(() => {
          querySnapshot.forEach((doc) => {
            let newUser = doc.data()
            newUser.id = doc.id
            this.users.push(newUser)
            this.users.sort((a, b) => a.name.localeCompare(b.name))
          })
        }, 500)
      } catch (error) {
        this.errorLoadingUsers = true
        alert.error('Error fetching users from Firestore')
        console.error(error)
      }
    },

    removeDiacritics(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },

    async refreshTable() {
      this.users = []
      this.fetchUsersFromFirestore()
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
    minmax(120px, 20%) 25% minmax(105px, 16%) minmax(105px, 16%)
    1fr 12%;
}

.vertical-grid-table {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
