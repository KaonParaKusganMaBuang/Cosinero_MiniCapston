<script setup>
const props = defineProps({ event: { type: Object, required: true } })
const emit = defineEmits(['remove'])

const formatPrice = (value) => `₱${Number(value || 0).toLocaleString()}`

function removeEvent() {
  emit('remove', props.event.id)
}
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
        <div>
          <small class="price-label">Price</small>
          <strong>{{ formatPrice(event.price) }}</strong>
        </div>
        <div class="card-actions">
          <button type="button" class="mini-action" @click.stop="removeEvent">
            Remove
          </button>
          <RouterLink class="btn btn-small" :to="`/events/${event.id}`">
            View event
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>
