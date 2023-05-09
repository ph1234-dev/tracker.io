<script setup>

function login() {
  router.push({
    name: 'home'
  })
}
</script>

<template role="nav" class="nav">
    <nav class="nav">
        <span class="nav-content">
            <router-link :to= "{name: 'tracker'}">Tracker.io</router-link>
            <a class="nav-link-push-left">Services</a>
            <router-link 
              :to= "{name: 'backup'}">
              Backup
            </router-link>
        </span>

    </nav>
</template>
