<template>
    <div class="container container-centered">
        <span class="text text-biggest text-bold">
            404
        </span>
        <span class="text text-big">
           Phew, Page not found.
        </span>
        <p class="message">
            You may be looking at some not existent page, please check the url
        </p>
        <router-link :to="{name: 'tracker'}" class="btn btn-primary">
            Go Back Home
        </router-link>
    </div>
</template>

<style scoped>

    *{  
        text-align: center;
    }
    .message{
        margin-top: 10vh;
    }
</style>