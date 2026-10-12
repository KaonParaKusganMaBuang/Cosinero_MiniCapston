<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

function login() {
  const users = JSON.parse(localStorage.getItem('eventUsers') || '[]')
  const user = users.find(
    (u) =>
      u.email === email.value.trim().toLowerCase() &&
      u.password === password.value,
  )

  if (!user) {
    error.value = 'Invalid email or password.'
    return
  }

  localStorage.setItem(
    'eventUser',
    JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  )

  router.push('/home')
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-logo">✦</div>
      <p class="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</p>
      <h1>Welcome back</h1>
      <p class="muted">Sign in to discover and book amazing events.</p>

      <form @submit.prevent="login">
        <label>Email address</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
        />

        <p v-if="error" class="error">{{ error }}</p>
        <button class="btn full-width">Login →</button>
      </form>

      <p class="auth-switch">
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </section>
  </main>
</template>
