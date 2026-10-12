<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()

const user = computed(() => JSON.parse(localStorage.getItem('eventUser') || '{}'))

const bookings = computed(() => {
  const all = JSON.parse(localStorage.getItem('eventBookings') || '[]')
  return all.filter((b) => b.email === user.value.email)
})

function logout() {
  localStorage.removeItem('eventUser')
  router.replace('/login')
}
</script>

<template>
  <AppHeader title="My profile" />

  <main class="page-container narrow">
    <section class="profile-card">
      <div class="avatar">
        {{ (user.name || 'U').charAt(0).toUpperCase() }}
      </div>
      <h1>{{ user.name || 'User' }}</h1>
      <p class="muted">{{ user.email }}</p>
      <span class="status-pill">Event member</span>
    </section>

    <section class="profile-stats">
      <div>
        <strong>{{ bookings.length }}</strong>
        <span>Total bookings</span>
      </div>
      <div>
        <strong>{{ bookings.reduce((sum, b) => sum + b.quantity, 0) }}</strong>
        <span>Tickets booked</span>
      </div>
    </section>

    <div class="settings-list">
      <RouterLink to="/history" class="settings-item">
        <span>▤ &nbsp; Booking history</span><span>→</span>
      </RouterLink>
      <RouterLink to="/events" class="settings-item">
        <span>▦ &nbsp; Discover events</span><span>→</span>
      </RouterLink>
      <button class="settings-item logout" @click="logout">
        <span>↪ &nbsp; Logout</span><span>→</span>
      </button>
    </div>
  </main>

  <BottomNav />
</template>
