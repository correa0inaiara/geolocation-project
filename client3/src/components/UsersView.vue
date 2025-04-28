<script setup>
import { API_URL } from '@/utils/globals';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;
const user = {}

onMounted(async () => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        const user = response.data;
    } catch (error) {
        console.log("Error while fetching: ", error);
    }
})


</script>
<template>
    <div class="center-container">
        <p>{{ user._id }}</p>
        <h1>{{ user.name }}</h1>
        <p>{{ user.email }}</p>
        <p>{{ user.address }}</p>
        <p>{{ user.longitude }} / {{ user.latitude }}</p>
        <RouterLink :to="`/users`" class="btn btn-green">Return to Users</RouterLink>
    </div>
</template>