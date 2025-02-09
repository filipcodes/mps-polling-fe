<template>
  <div class="bg-white border p-4 rounded-md shadow-md">
    <h2 class="bevan text-3xl font-medium mb-4 text-center">
      Pripnutá Rozprava
    </h2>
    <ul class="flex flex-col gap-4">
      <li
        class="flex items-center gap-4 border rounded-md p-2 shadow-sm"
        v-for="(user, index) in descant.usersSignedUp"
        :key="index"
      >
        <div class="bevan">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="">
          <div>
            <span>{{ user.userName }}</span>
          </div>
          <div>
            <span class="text-sm">{{ user.signUpTime }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PinnedDescant',

  props: {
    descant: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped></style>
