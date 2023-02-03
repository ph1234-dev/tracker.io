<template>
    <span class="footer">
        <span class="footer-content">
            <a>About</a>
            <a>Privacy</a>
            <a>Ahmadrasol A. Sam &#169; {{year}}</a>
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