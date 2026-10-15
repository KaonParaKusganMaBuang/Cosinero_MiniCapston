<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

function register() {
  const users = JSON.parse(localStorage.getItem('eventUsers') || '[]')
  const normalizedEmail = email.value.trim().toLowerCase()

  if (password.value.length < 6) {
    error.value = 'Password must contain at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  if (users.some((u) => u.email === normalizedEmail)) {
    error.value = 'This email is already registered.'
    return
  }

  users.push({
    name: name.value.trim(),
    email: normalizedEmail,
    password: password.value,
  })

  localStorage.setItem('eventUsers', JSON.stringify(users))
  router.push('/login')
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-logo">✦</div>
      <p class="eyebrow">JOIN THE COMMUNITY</p>
      <h1>Create account</h1>
      <p class="muted">Start discovering your next favorite event.</p>

      <form @submit.prevent="register">
        <label>Full name</label>
        <input v-model="name" required placeholder="Your full name" />

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
          minlength="6"
          placeholder="At least 6 characters"
        />

        <label>Confirm password</label>
        <input
          v-model="confirmPassword"
          type="password"
          required
          minlength="6"
          placeholder="Re-enter your password"
        />

        <p v-if="error" class="error">{{ error }}</p>
        <button class="btn full-width">Create account →</button>
      </form>

      <p class="auth-switch">
        Already have an account?
        <RouterLink to="/login">Login</RouterLink>
      </p>
    </section>
  </main>
</template>
