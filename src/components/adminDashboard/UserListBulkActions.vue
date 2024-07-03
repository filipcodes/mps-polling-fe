<script setup>
import { alert } from '@/states/bottomAlert.js'
</script>
<template>
  <footer
    class="bg-gray-700 px-4 h-full py-1 border-t flex justify-start items-center"
  >
    <span class="text-gray-100 mr-2 roboto text-sm font-medium tracking-wide">
      Hromadné akcie:
    </span>
    <ul class="flex gap-1">
      <li
        v-for="(bulkAction, index) in bulkActions"
        :key="index"
        class="border-r pr-1 border-gray-500"
      >
        <button
          @click="bulkAction.function"
          class="hover:bg-gray-600 hover:text-gray-300 text-gray-400 rounded-sm px-2 transition-all duration-200 hover:cursor-pointer"
        >
          <span class="roboto text-sm font-normal tracking-wide">
            {{ bulkAction.title }}
          </span>
        </button>
      </li>
    </ul>
  </footer>
</template>

<script>
import emailjs from '@emailjs/browser'

export default {
  name: 'UserListBulkActions',
  data() {
    return {
      bulkActions: [
        {
          title: 'Odstrániť všetkých',
          function: () => this.deleteAll()
        },
        {
          title: 'Poslať všetkým kódy',
          function: () => this.sendAll()
        }
      ]
    }
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteAll() {
      console.log('delete all')
      // Admin SDK neeeded for this operation to works
    },

    async sendAll() {
      try {
        const users = await this.users // Assuming there is a method to fetch all users
        const emailPromises = users.map((user) => {
          return emailjs.send(
            'service_5c5rd2h',
            'template_ig7axxo',
            {
              code: user.code,
              toEmail: user.email
            },
            'FHX5JHLwJKqHdyPTP'
          )
        })
        await Promise.all(emailPromises)
        alert.success(`Emails were successfully sent to all users.`)
      } catch (error) {
        alert.error(`Failed to send emails to all users.`)
        console.log(error)
      }
    }
  }
}
</script>

<style scoped></style>
