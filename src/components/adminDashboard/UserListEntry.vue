<script setup>
import { mdiContentCopy } from '@mdi/js'
import { mdiEmailFast } from '@mdi/js'
import { mdiRefresh } from '@mdi/js'
import { mdiPencil } from '@mdi/js'
</script>
<template>
  <li
    class="table-grid group/user items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100"
  >
    <!-- USERNAME -->
    <span>{{ user.name }}</span>

    <!-- EMAIL -->
    <span class="overflow-hidden max-w-56 text-ellipsis">
      {{ user.email }}
    </span>

    <!-- PARTY -->
    <span class="bg-gray-300 w-fit block px-1 rounded-sm">
      {{ user.party }}
    </span>

    <!-- COMMITTEE -->
    <span class="bg-purple-300 w-fit block px-1 rounded-sm">
      {{ user.committee }}
    </span>

    <!-- CODE -->
    <span class="w-fit block font-medium tracking-wider">
      <div
        title="Skopírovať do schránky"
        @click="copyToClipboard(user.code)"
        class="hover:bg-gray-300 rounded-sm p-1 group transition-all duration-200 flex gap-2 items-center hover:cursor-pointer"
      >
        {{ user.code }}
        <svg-icon
          type="mdi"
          size="20"
          :path="mdiContentCopy"
          class="text-transparent transition-all group-hover:text-gray-500 duration-200"
        ></svg-icon>
      </div>
    </span>

    <!-- ACTIONS -->
    <UserListEntryActions
      class="text-transparent fill-transparent group-hover/user:text-gray-700 group-hover:fill-gray-700 transition-all duration-200"
      @send-code-to-email="sendCodeToEmail(user.email, user.code)"
      @reset-code="resetUserCode()"
      @edit-user="editUser()"
    ></UserListEntryActions>
  </li>
</template>

<script>
import emailjs from '@emailjs/browser'
import SvgIcon from '@jamescoyle/vue-icon'
import UserListEntryActions from '@/components/adminDashboard/UserListEntryActions.vue'

export default {
  name: 'UserListEntry',
  data() {
    return {
      actions: [
        {
          icon: mdiEmailFast,
          title: 'Poslať poslanecký kód na email'
        },
        {
          icon: mdiRefresh,
          title: 'Obnoviť poslanecký kód'
        }
      ]
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    async copyToClipboard(code) {
      try {
        await navigator.clipboard.writeText(code)
        alert('Code copied to clipboard')
      } catch (error) {
        alert('Failed to copy code to clipboard')
      }
    },
    async sendCodeToEmail(email, code) {
      console.log(code, email)
      try {
        await emailjs.send(
          'service_5c5rd2h',
          'template_ig7axxo',

          {
            code: code,
            toEmail: email
          },
          'FHX5JHLwJKqHdyPTP'
        )
        alert(`Email with code sent to ${email}`)
        console.log('Email with code sent successfully!')
      } catch (error) {
        console.log('FAILED...', error)
      }
    },
    async resetUserCode() {
      try {
        // Reset code logic here
        alert('Code reset')
      } catch (error) {
        alert('Failed to reset code')
      }
    },
    editUser() {
      // Edit user logic here
      alert('User edited')
      alert('Failed to edit user')
    }
  },
  components: {
    UserListEntryActions
  }
}
</script>

<style scoped></style>
