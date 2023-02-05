<template>
    <span class="footer">
        <span class="footer-content">
            <router-link :to="{name: 'about'}" >About</router-link>
            <router-link :to="{name: 'privacy'}" >Privacy</router-link>
            <router-link :to="{name: 'author'}" >Ahmadrasol A. Sam &#169; {{year}}</router-link>
        </span>
    </span>
</template>

<script setup>
    let year = new Date().getFullYear()
</script>

<style lang="scss">
    .footer-content{
        >*:last-child{
            margin-left: auto;
        }
    }
</style>