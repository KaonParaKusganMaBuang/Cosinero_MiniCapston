<script setup>
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import EventCard from '../components/EventCard.vue'
import { getEvents } from '../events'

const user = computed(() => JSON.parse(localStorage.getItem('eventUser') || '{}'))
const featuredEvents = computed(() => getEvents().slice(0, 3))
</script>

<template>
  <AppHeader title="Discover" />

  <main class="page-container">
    <section class="hero">
      <span class="hero-tag">YOUR WORLD, YOUR EVENTS</span>
      <h1>Make time for<br />something amazing.</h1>
      <p>Discover experiences worth remembering.</p>
      <RouterLink to="/events" class="btn hero-btn">Explore events →</RouterLink>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">HANDPICKED FOR YOU</p>
          <h2>Upcoming events</h2>
        </div>
        <RouterLink to="/events">View all →</RouterLink>
      </div>

      <p class="muted">Welcome, {{ user.name || 'Guest' }}!</p>

      <div class="event-grid">
        <EventCard v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </section>
  </main>

  <BottomNav />
</template>
