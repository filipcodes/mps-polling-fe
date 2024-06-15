<template>
  <div class="flex gap-4 min-h-screen roboto">
    <aside>
      <Sidebar></Sidebar>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import Sidebar from '@/components/adminDashboard/Sidebar.vue'
</script>
