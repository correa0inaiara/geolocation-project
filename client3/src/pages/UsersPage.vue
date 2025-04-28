<script setup>
import UsersComponent from '@/components/UsersComponent.vue';
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="center-container">
        <h1>Users</h1>
        <RouterLink :to="`/`" class="btn btn-green">Return to Home</RouterLink>

        <UsersComponent />
    </div>
</template>