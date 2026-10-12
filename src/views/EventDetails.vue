<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import { events } from '../events'

const route = useRoute()
const router = useRouter()

const event = computed(() => events.find((e) => e.id === Number(route.params.id)))
</script>

<template>
  <AppHeader title="Event details" />

  <main class="page-container" v-if="event">
    <button class="text-button" @click="router.back()">← Back</button>

    <img class="detail-image" :src="event.image" :alt="event.title" />

    <p class="eyebrow">{{ event.category }}</p>
    <h1>{{ event.title }}</h1>
    <p class="muted">{{ event.description }}</p>

    <div class="detail-info">
      <div>
        <span>DATE</span><strong>{{ event.date }}</strong>
      </div>
      <div>
        <span>TIME</span><strong>{{ event.time }}</strong>
      </div>
      <div>
        <span>LOCATION</span><strong>{{ event.location }}</strong>
      </div>
      <div>
        <span>TICKET PRICE</span>
        <strong>₱{{ event.price.toLocaleString() }}</strong>
      </div>
    </div>

    <button class="btn full-width" @click="router.push(`/booking/${event.id}`)">
      Book this event →
    </button>
  </main>

  <main v-else class="page-container">
    <h1>Event not found</h1>
    <RouterLink to="/events">Browse events</RouterLink>
  </main>

  <BottomNav />
</template>
