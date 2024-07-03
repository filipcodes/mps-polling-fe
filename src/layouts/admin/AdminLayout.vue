<template>
  <div class="flex min-h-screen roboto">
    <aside>
      <Sidebar></Sidebar>
    </aside>
    <main class="p-4 pb-12 w-full">
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import Sidebar from '@/components/adminDashboard/Sidebar.vue'
</script>
