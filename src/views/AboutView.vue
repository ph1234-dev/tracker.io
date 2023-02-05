<script setup>
import { useRouter } from 'vue-router';

let router = useRouter()


</script>

<template>
  <section class="panel panel-vertical">
    <h1>Tracker.io</h1>
        <p>
            A free calorie tracker application where you can log your food consumption
            and to help track your progress.
        </p>
      <router-link :to="{name: 'tracker'}" class="btn btn-primary">
        Start
      </router-link>
    </section>

</template>

<style scoped>
  p{
    text-indent: 5ch  ;
    max-width: 45ch;
    /* text-align: center; */
  }
</style>
