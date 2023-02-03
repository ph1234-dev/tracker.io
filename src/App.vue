<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
  <div class="template">
    <header class="template-header">
      <Nav />
    </header>

    <main class="template-body ">
      <div class="container container-centered" >
        <RouterView></RouterView>
      </div>
    </main>

    <footer class="template-footer">
      <Footer />
    </footer>
  </div>
</template>

<style lang="scss" >
@use "assets/scss/app.scss";

@import "@/assets/icon-font/style.css";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

* {
  font-family: 'Poppins', sans-serif !important;
}
</style>
