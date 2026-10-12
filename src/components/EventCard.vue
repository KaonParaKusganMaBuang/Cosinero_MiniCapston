<script setup>
defineProps({ event: { type: Object, required: true } })
</script>

<template>
  <article class="event-card">
    <img :src="event.image" :alt="event.title" />
    <div class="event-card-body">
      <span class="eyebrow">{{ event.category }}</span>
      <h3>{{ event.title }}</h3>
      <p>📅 {{ event.date }}</p>
      <p>📍 {{ event.location }}</p>
      <div class="card-footer">
        <strong>₱{{ event.price.toLocaleString() }}</strong>
        <RouterLink class="btn btn-small" :to="`/events/${event.id}`">
          View event
        </RouterLink>
      </div>
    </div>
  </article>
</template>
