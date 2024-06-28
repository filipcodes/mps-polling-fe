<script setup>
import { mdiContentCopy } from '@mdi/js'
import { mdiEmailFast } from '@mdi/js'
import { mdiRefresh } from '@mdi/js'
import { mdiPencil } from '@mdi/js'
import { mdiTrashCan } from '@mdi/js'
</script>
<template>
  <div class="flex gap-1 border-l pl-2">
    <button
      v-for="(action, index) in actions"
      :key="index"
      @click="$emit(action.emit)"
      :title="action.title"
      class="hover:bg-gray-300 px-1 py-1 rounded-md transition-all duration-200"
    >
      <svg-icon type="mdi" size="20" :path="action.icon" class=""></svg-icon>
    </button>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
export default {
  name: 'UserListEntryAction',
  data() {
    return {
      actions: [
        {
          icon: mdiEmailFast,
          title: 'Poslať poslanecký kód na email',
          emit: 'send-code-to-email'
        },
        {
          icon: mdiRefresh,
          title: 'Obnoviť poslanecký kód',
          emit: 'reset-code'
        },
        {
          icon: mdiPencil,
          title: 'Zmeniť údaje o účastníkovi',
          emit: 'edit-user'
        },
        {
          icon: mdiTrashCan,
          title: 'Odstrániť účastníka',
          emit: 'delete-user'
        }
      ]
    }
  },
  children: {
    SvgIcon
  }
}
</script>

<style lang="scss" scoped></style>
