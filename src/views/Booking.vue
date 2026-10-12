<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import { events } from '../events'

const route = useRoute()
const router = useRouter()
const event = events.find((e) => e.id === Number(route.params.id))
const quantity = ref(1)
const confirmed = ref(false)

const total = computed(() => (event ? event.price * quantity.value : 0))

function confirmBooking() {
  if (!event) return

  const user = JSON.parse(localStorage.getItem('eventUser') || '{}')
  const history = JSON.parse(localStorage.getItem('eventBookings') || '[]')

  const booking = {
    id: `BK-${Date.now()}`,
    eventId: event.id,
    title: event.title,
    date: event.date,
    location: event.location,
    image: event.image,
    email: user.email,
    quantity: quantity.value,
    total: total.value,
    status: 'Confirmed',
    bookedAt: new Date().toISOString(),
  }

  history.unshift(booking)
  localStorage.setItem('eventBookings', JSON.stringify(history))
  confirmed.value = true
}
</script>

<template>
  <AppHeader title="Book your tickets" />

  <main class="page-container narrow" v-if="event">
    <template v-if="!confirmed">
      <p class="eyebrow">ALMOST THERE</p>
      <h1>Complete your booking</h1>

      <div class="booking-summary">
        <img :src="event.image" :alt="event.title" />
        <div>
          <h3>{{ event.title }}</h3>
          <p>{{ event.date }}</p>
          <p>{{ event.location }}</p>
          <strong>₱{{ event.price.toLocaleString() }} / ticket</strong>
        </div>
      </div>

      <div class="form-section">
        <label for="quantity">Number of tickets</label>
        <select id="quantity" v-model.number="quantity">
          <option v-for="n in 10" :key="n" :value="n">
            {{ n }} {{ n === 1 ? 'ticket' : 'tickets' }}
          </option>
        </select>
      </div>

      <div class="total-row">
        <span>Total amount</span>
        <strong>₱{{ total.toLocaleString() }}</strong>
      </div>

      <p class="muted">Demo only: no payment will be collected.</p>
      <button class="btn full-width" @click="confirmBooking">Confirm booking →</button>
    </template>

    <section v-else class="success-card">
      <div class="success-icon">✓</div>
      <p class="eyebrow">BOOKING COMPLETE</p>
      <h1>You're on the list!</h1>
      <p>Your demo booking has been saved to your history.</p>
      <RouterLink to="/history" class="btn full-width">View my bookings</RouterLink>
      <RouterLink to="/events" class="secondary-link">Explore more events</RouterLink>
    </section>
  </main>

  <main v-else class="page-container">
    <h1>Event not found</h1>
    <RouterLink to="/events">Browse events</RouterLink>
  </main>

  <BottomNav />
</template>
