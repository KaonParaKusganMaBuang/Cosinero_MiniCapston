<script setup>
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import EventCard from '../components/EventCard.vue'
import { events } from '../events'

const search = ref('')
const category = ref('All')

const categories = ['All', ...new Set(events.map((e) => e.category))]

const filteredEvents = computed(() =>
  events.filter((event) => {
    const matchesSearch = `${event.title} ${event.location}`
      .toLowerCase()
      .includes(search.value.toLowerCase())

    return (
      matchesSearch && (category.value === 'All' || event.category === category.value)
    )
  }),
)
</script>

<template>
  <AppHeader title="Explore events" />

  <main class="page-container">
    <p class="eyebrow">FIND YOUR NEXT EXPERIENCE</p>
    <h1>Explore events</h1>
    <p class="muted">Find something exciting happening near you.</p>

    <input
      v-model="search"
      class="search-input"
      placeholder="Search events or locations..."
    />

    <div class="filter-list">
      <button
        v-for="item in categories"
        :key="item"
        class="filter-chip"
        :class="{ active: category === item }"
        @click="category = item"
      >
        {{ item }}
      </button>
    </div>

    <div v-if="filteredEvents.length" class="event-grid">
      <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" />
    </div>
    <p v-else class="empty-state">No events match your search.</p>
  </main>

  <BottomNav />
</template>
