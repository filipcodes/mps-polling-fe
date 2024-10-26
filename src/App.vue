<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
import BottomAlert from '@/components/BottomAlert.vue'
</script>

<template>
  <router-view />
  <BottomAlert></BottomAlert>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bevan:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

.bevan {
  font-family: 'Bevan', serif;
}

.roboto {
  font-family: 'Poppins', sans-serif;
}

input:focus {
  box-shadow: 0 0 0 4px #3b83f681;
}

p,
span,
a,
div,
h2,
h3,
h4,
h5 {
  font-family: 'Roboto', sans-serif;
}

.otp-input-container {
  display: flex;
  justify-content: space-between;
}

.otp-input {
  width: 2.6rem;
  height: 2.8rem;
  padding: 5px;
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #e5e7eb;
  text-align: center;
  background-color: #f2f4f6;
  outline: none;
  transition: all 300ms ease-out;
}

.otp-input:focus {
  box-shadow: 0 0 0 4px #3b83f681;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
