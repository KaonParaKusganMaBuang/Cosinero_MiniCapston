<script setup>
defineProps({
  title: { type: String, default: 'Eventify' },
})
</script>

<template>
  <header class="app-header">
    <RouterLink to="/home" class="brand">✦ Eventify</RouterLink>
    <span class="header-title">{{ title }}</span>
    <RouterLink to="/profile" class="profile-link">Profile ↗</RouterLink>
  </header>
</template>
