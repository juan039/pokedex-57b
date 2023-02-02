<template>
  <div id="app">
    <nav v-if="$route.path != '/login'">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">Favorites</router-link> |
      <a href="javascript:void(0)" @click="logOut">Log out</a>
    </nav>
    <transition name="fade">
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('pokemon')
      this.$router.push({ path: "/login" })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
