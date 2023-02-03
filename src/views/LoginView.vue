<script setup>
import router from '../router';


function login() {
  router.push({
    name: 'home'
  })
}

</script>

<template >
  <div class="container container-centered">
    <form class="form">
      <span class="title">Login</span>
      <span></span>
      <label>Username</label>
      <input type="text" />

      <label>Password</label>
      <input type="text" />
      <input type="submit" @click.stop="login" />
    </form>
  </div>
</template>

<style scoped>

</style>