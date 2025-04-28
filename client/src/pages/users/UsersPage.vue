<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="center-container">
        <h1>Welcome to the Geolocation Project</h1>
        <RouterLink :to="`/users`" class="btn btn-green">Go To Users Page</RouterLink>
        <RouterLink :to="`/regions`" class="btn btn-green">Go To Regions Page</RouterLink>
        <RouterLink :to="`/searchByDistance`" class="btn btn-green">Go To Search By Distance Page</RouterLink>
        <RouterLink :to="`/searchByPoint`" class="btn btn-green">Go To Search By Point Page</RouterLink>
    </div>
</template>