<script setup>
import { computed, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import EventCard from '../components/EventCard.vue'
import { addCustomEvent, getEvents, removeEventById } from '../events'

const FORM_DRAFT_KEY = 'eventFormDraft'
const SEARCH_DRAFT_KEY = 'eventSearchDraft'
const CATEGORY_DRAFT_KEY = 'eventCategoryDraft'

const search = ref('')
const category = ref('All')
const allEvents = ref(getEvents())

const savedDraft = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || 'null') : null

const newEvent = ref({
  title: savedDraft?.title || '',
  category: savedDraft?.category || 'Music',
  date: savedDraft?.date || '',
  time: savedDraft?.time || '',
  location: savedDraft?.location || '',
  price: savedDraft?.price ?? 0,
  description: savedDraft?.description || '',
})

if (typeof window !== 'undefined') {
  const savedSearch = localStorage.getItem(SEARCH_DRAFT_KEY)
  const savedCategory = localStorage.getItem(CATEGORY_DRAFT_KEY)

  search.value = savedSearch || ''
  category.value = savedCategory || 'All'
}

const categories = computed(() => ['All', ...new Set(allEvents.value.map((e) => e.category))])

watch(
  newEvent,
  (value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(value))
    }
  },
  { deep: true },
)

watch(search, (value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SEARCH_DRAFT_KEY, value)
  }
})

watch(category, (value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORY_DRAFT_KEY, value)
  }
})

const filteredEvents = computed(() =>
  allEvents.value.filter((event) => {
    const matchesSearch = `${event.title} ${event.location}`
      .toLowerCase()
      .includes(search.value.toLowerCase())

    return (
      matchesSearch && (category.value === 'All' || event.category === category.value)
    )
  }),
)

function refreshEvents() {
  allEvents.value = getEvents()
}

function submitEvent() {
  if (!newEvent.value.title.trim() || !newEvent.value.date || !newEvent.value.location.trim()) {
    return
  }

  addCustomEvent({
    title: newEvent.value.title,
    category: newEvent.value.category,
    date: newEvent.value.date,
    time: newEvent.value.time || 'TBA',
    location: newEvent.value.location,
    price: Number(newEvent.value.price) || 0,
    description: newEvent.value.description || 'A newly added event for the community.',
  })

  newEvent.value = {
    title: '',
    category: 'Music',
    date: '',
    time: '',
    location: '',
    price: 0,
    description: '',
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(FORM_DRAFT_KEY)
  }

  refreshEvents()
}

function removeEvent(eventId) {
  removeEventById(eventId)
  refreshEvents()
}
</script>

<template>
  <AppHeader title="Explore events" />

  <main class="page-container">
    <p class="eyebrow">FIND YOUR NEXT EXPERIENCE</p>
    <h1>Explore events</h1>
    <p class="muted">Find something exciting happening near you.</p>

    <form class="event-form" @submit.prevent="submitEvent">
      <h2>Add a new event</h2>
      <div class="form-grid">
        <input v-model="newEvent.title" placeholder="Event title" required />
        <select v-model="newEvent.category">
          <option value="Music">Music</option>
          <option value="Technology">Technology</option>
          <option value="Food">Food</option>
          <option value="Business">Business</option>
          <option value="General">General</option>
        </select>
        <input v-model="newEvent.date" type="date" required />
        <input v-model="newEvent.time" placeholder="Time" />
        <input v-model="newEvent.location" placeholder="Location" required />
        <label class="price-field">
          <span>Ticket price (₱)</span>
          <input v-model.number="newEvent.price" type="number" min="0" placeholder="500" />
        </label>
      </div>
      <textarea v-model="newEvent.description" rows="3" placeholder="Event description"></textarea>
      <button class="btn full-width" type="submit">Add event</button>
    </form>

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
      <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" @remove="removeEvent" />
    </div>
    <p v-else class="empty-state">No events match your search.</p>
  </main>

  <BottomNav />
</template>
