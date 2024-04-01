<script setup>
import { signIn } from '@/states/signInStates'
</script>
<template>
  <div class="h-screen min-h-screen p-1">
    <div class="flex justify-center items-center h-full">
      <div
        class="shadow-xl rounded-xl mx-4 sm:mx-0 h-fit max-w-96 sm:w-2/3 sm:min-w-96 overflow-hidden"
      >
        <img
          src="https://files.vlastnawebstranka.websupport.sk/f0/ae/f0ae1bda-e6a6-47fc-816c-32e223a9ea80.JPG"
          alt=""
          class="w-full object-cover h-32"
        />
        <div class="p-6 bg-white flex items-center justify-center">
          <!--! SIGN IN FORM -->
          <TheEmailInputForm v-if="signIn.signInStep === 0"></TheEmailInputForm>
          <div v-if="signIn.signInStep === 1">
            <TheOtpInputForm></TheOtpInputForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Components
import TheEmailInputForm from '@/components/signIn/TheEmailInputForm.vue'
import TheOtpInputForm from '@/components/signIn/TheOtpInputForm.vue'

export default {
  components: { TheEmailInputForm, TheOtpInputForm }
}
</script>

<style scoped>
::placeholder {
  color: black;
  opacity: 0.6; /* Firefox */
}
</style>
