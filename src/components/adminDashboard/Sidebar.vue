<script setup>
import SignOutButton from '@/components/atendeeDashboard/SignOutButton.vue'
</script>
<template>
  <div
    class="min-w-64 max-w-80 p-2 pt-0 bg-red-700 text-white h-full roboto flex flex-col justify-between"
  >
    <div class="flex items-center gap-4 p-4 border-b-[1.5px] border-red-800">
      <div
        alt="admin logo"
        class="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current text-red-600"
        >
          <path
            d="m21 2-5 5-4-5-4 5-5-5v13h18zM5 21h14a2 2 0 0 0 2-2v-2H3v2a2 2 0 0 0 2 2z"
          ></path>
        </svg>
      </div>
      <div>
        <h1 class="bevan text-lg">Admin</h1>
        <p
          class="text-sm roboto text-ellipsis overflow-hidden max-w-40 text-red-300"
        >
          filip.sipos@student.leaf.academy
        </p>
      </div>
    </div>

    <div class="">
      <span
        class="block ml-2 roboto uppercase text-sm text-red-400 font-bold tracking-wider mb-3"
        >Menu</span
      >
      <nav class="pl-2">
        <ul class="flex flex-col gap-1">
          <li v-for="(link, index) in navigationLinks" :key="index">
            <router-link
              :to="link.route"
              :class="[
                'flex items-center gap-4 hover:bg-red-800 hover:text-red-50  transition-all duration-200 p-2 rounded-md',
                activeRoute === link.route
                  ? 'bg-red-900 text-white'
                  : 'text-red-200 '
              ]"
            >
              <svg-icon type="mdi" :path="link.icon"></svg-icon>
              <span class="font-normal tracking-[0.03em] roboto">{{
                link.name
              }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <SignOutButton class="w-full"></SignOutButton>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiVote } from '@mdi/js'
import { mdiAccountMultiple } from '@mdi/js'
import { mdiHistory } from '@mdi/js'
import { mdiCog } from '@mdi/js'

export default {
  name: 'Sidebar',
  methods: {},
  computed: {
    activeRoute() {
      return this.$route.path
    }
  },
  data() {
    return {
      navigationLinks: [
        {
          name: 'Účastníci',
          icon: mdiAccountMultiple,
          route: '/admin/users'
        },
        {
          name: 'Hlasovania',
          icon: mdiVote,
          route: '/admin/polls'
        },
        {
          name: 'História',
          icon: mdiHistory,
          route: '/admin/history'
        },
        {
          name: 'Nastavenia',
          icon: mdiCog,
          route: '/admin/settings'
        }
      ]
    }
  },
  components: {
    SignOutButton,
    SvgIcon
  }
}
</script>

<style scoped>
.bevan {
  font-family: 'Bevan', serif;
}
</style>
