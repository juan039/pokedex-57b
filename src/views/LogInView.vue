<template>
  <div class="login position-absolute top-50 start-50 translate-middle">
    <h1>Welcome to your Pokedex</h1>

    <div class="container">
      <LogIn />
    </div>
  </div>
</template>

<script>
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'LogInView',
  components: {
    LogIn
  }
}
</script>
