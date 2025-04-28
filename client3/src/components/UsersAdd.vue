<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import router from '@/router';
import { API_URL } from '@/utils/globals';

const form = reactive({
    name: '',
    email: '',
    address: '',
    longitude: '',
    latitude: ''
})
const handleSubmit = async () => {
    const newUser = {
        name: form.name,
        email: form.email,
        address: form.address,
        longitude: form.longitude,
        latitude: form.latitude
    }
    try {
        const response = await axios.post(`${API_URL}/users`, newUser);
        console.log('response', response)
        return router.push('/users');
    } catch (error) {
        console.error("Error on posting data:", error);
    }
}

</script>

<template>
    <RouterLink :to="`/users`" class="btn btn-green">Return to Users</RouterLink>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="name">Name</label>
            <input 
                v-model="form.name" 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Name">

            <label for="email">E-mail</label>
            <input 
                v-model="form.email" 
                type="email"
                id="email" 
                name="email">
            
            <label for="address">Address</label>
            <input
                v-model="form.address" 
                id="address" 
                name="address">
            
            <label for="longitude">Longitude</label>
            <input
                v-model="form.longitude" 
                id="longitude" 
                name="longitude">

            <label for="latitude">Latitude</label>
            <input
                v-model="form.latitude" 
                id="latitude" 
                name="latitude">
            <button type="submit" class="btn btn-green">Submit</button>
        </form>
    </div>
</template>