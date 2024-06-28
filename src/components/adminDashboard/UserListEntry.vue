<script setup>
import { mdiContentCopy } from '@mdi/js'
import { mdiStarFourPointsCircle } from '@mdi/js'
import { mdiStarFourPoints } from '@mdi/js'
import { mdiContentSave } from '@mdi/js'
// This has to be imported before the Firebase call, so that the tags are available in correct color
import { tags } from '@/states/tags'
import { alert } from '@/states/bottomAlert.js'
</script>
<template>
  <li
    class="table-grid group/user items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100"
  >
    <!-- USERNAME AND WHETHER IT IS A CHAIRMAN/DEPUTY CHAIRMAN OF THE PARTY-->
    <div class="">
      <input
        v-if="isEditing"
        v-model="user.name"
        class="w-min font-medium px-1 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <div v-else class="flex items-center gap-1">
        <span class="font-medium">{{ user.name }}</span>

        <!-- ! PREDSEDA -->
        <span
          v-if="user?.positions?.includes('predseda')"
          :class="['text-xs rounded-sm']"
          title="Predseda strany"
        >
          <svg-icon
            type="mdi"
            size="20"
            :path="mdiStarFourPointsCircle"
            :class="`text-${tags.parties[user.party]?.color} `"
          ></svg-icon>
        </span>

        <!-- ! PODPREDSEDA -->
        <span
          v-if="user?.positions?.includes('podpredseda')"
          :class="['text-xs rounded-sm']"
          title="Podpredseda strany"
        >
          <svg-icon
            type="mdi"
            size="16"
            :path="mdiStarFourPoints"
            :class="`text-${tags.parties[user.party]?.color}`"
          ></svg-icon>
        </span>
      </div>
    </div>

    <!-- EMAIL -->

    <input
      v-if="isEditing"
      v-model="user.email"
      class="w-fit px-1 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    <span v-else class="overflow-hidden max-w-56 text-ellipsis text-gray-500">
      <a class="hover:underline" :href="`mailto:${user.email}`">
        {{ user.email }}
      </a>
    </span>

    <!-- PARTY -->
    <span
      :class="['w-fit block px-1 rounded-sm', tags.parties[user.party]?.tag]"
    >
      {{ user.party }}
    </span>

    <!--! COMMITTEE -->
    <div class="">
      <span
        v-if="user.committee"
        :class="[
          'w-fit block px-1 rounded-sm border-2',
          tags.committees[user.committee]
        ]"
      >
        {{ user.committee }}
      </span>
    </div>

    <!--! CODE -->
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

    <!--! ACTIONS -->
    <UserListEntryActions
      v-if="!isEditing"
      class="text-transparent fill-transparent group-hover/user:text-gray-700 group-hover:fill-gray-700 transition-all duration-200"
      @send-code-to-email="sendCodeToEmail(user.email, user.code)"
      @reset-code="resetUserCode()"
      @edit-user="isEditing = true"
      @delete-user="deleteUserAndRemoveAuth()"
    ></UserListEntryActions>

    <!--! EDITING ACTIONS - SAVE -->
    <div class="flex justify-center items-center" v-else>
      <button
        @click="saveEdit()"
        class="hover:bg-gray-300 mx-2 items-center rounded-sm p-1 group transition-all duration-200 flex justify-center gap-2 hover:cursor-pointer"
      >
        <span class="roboto text-sm font-medium tracking-wide"> Uložiť </span>
        <svg-icon
          type="mdi"
          size="20"
          :path="mdiContentSave"
          class="text-gray-800 transition-all duration-200"
        ></svg-icon>
      </button>
    </div>
  </li>
</template>

<script>
import emailjs from '@emailjs/browser'
import SvgIcon from '@jamescoyle/vue-icon'
import UserListEntryActions from '@/components/adminDashboard/UserListEntryActions.vue'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { getAuth, deleteUser } from 'firebase/auth'
const db = getFirestore()

export default {
  name: 'UserListEntry',
  data() {
    return {
      isEditing: false
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
        alert.success(`Code copied to clipboard`)
      } catch (error) {
        alert.error(`Failed to copy code to clipboard`)
        console.log(error)
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
        alert.show(`Email successfully sent to ${email}`)
      } catch (error) {
        alert.show(`Failed to send email to ${email}`)
        console.log(error)
      }
    },
    async resetUserCode() {
      try {
        // Reset code logic here
        const userRef = doc(db, 'users', this.user.id)
        const newCode = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, '0')

        // Handling the 1 in a million chance that the new code is the same as the old one
        if (newCode === this.user.code) {
          this.resetUserCode()
        }

        //TODO: Also compare to other codes in the database

        await updateDoc(userRef, {
          code: newCode
        })

        this.user.code = newCode
        alert.show(`User code for ${this.user.name} reset successfully!`)
      } catch (error) {
        alert.show(`Failed to reset user code for ${this.user.name}`)
        console.log(error)
      }
    },

    async deleteUserAndRemoveAuth() {
      try {
        // Delete user doc from the users collection
        if (!confirm(`Are you sure you want to delete ${this.user.name}?`)) {
          return
        }
        const userRef = doc(db, 'users', this.user.id)
        await deleteDoc(userRef)
        this.$emit('deleted-user')

        // Delete user from the Firebase auth
        // try {
        //   // Admin SDK needed for this to work
        // } catch (error) {
        //   console.log(error)
        //   alert('Failed to delete user from auth', error)
        // }
        alert.show(`User ${this.user.name} deleted successfully!`)
      } catch (error) {
        alert.show(`Failed to delete ${this.user.name}`)
        console.log(error)
      }
    },

    async saveEdit() {
      // Edit user logic here
      try {
        const userRef = doc(db, 'users', this.user.id)
        await updateDoc(userRef, {
          name: this.user.name,
          email: this.user.email,
          party: this.user.party,
          committee: this.user.committee
        })
        this.isEditing = false
        alert.show(`User edits for ${this.user.name} saved successfully!`)
      } catch (error) {
        alert.show(`Failed to save user edits for ${this.user.name}`)
        console.log(error)
      }
    }
  },
  components: {
    UserListEntryActions
  }
}
</script>

<style scoped></style>
