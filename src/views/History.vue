<script setup>
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'

const user = JSON.parse(localStorage.getItem('eventUser') || '{}')

const bookings = computed(() => {
  const all = JSON.parse(localStorage.getItem('eventBookings') || '[]')
  return all.filter((b) => b.email === user.email)
})
</script>

<template>
  <AppHeader title="Booking history" />

  <main class="page-container">
    <p class="eyebrow">YOUR EXPERIENCES</p>
    <h1>My bookings</h1>
    <p class="muted">All your event reservations in one place.</p>

    <div v-if="bookings.length" class="history-list">
      <article v-for="booking in bookings" :key="booking.id" class="history-card">
        <img :src="booking.image" :alt="booking.title" />
        <div class="history-info">
          <span class="status-pill">{{ booking.status }}</span>
          <h3>{{ booking.title }}</h3>
          <p>📅 {{ booking.date }}</p>
          <p>📍 {{ booking.location }}</p>
          <p>{{ booking.quantity }} ticket(s)</p>
          <strong>₱{{ booking.total.toLocaleString() }}</strong>
          <p class="muted booking-id">Ref: {{ booking.id }}</p>
        </div>
      </article>
    </div>

    <section v-else class="empty-state">
      <div class="empty-icon">▤</div>
      <h2>No bookings yet</h2>
      <p class="muted">Your confirmed event bookings will appear here.</p>
      <RouterLink to="/events" class="btn">Explore events →</RouterLink>
    </section>
  </main>

  <BottomNav />
</template>
