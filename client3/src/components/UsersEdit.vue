<script setup>
import { API_URL } from '@/utils/globals';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserById } from '../services/UsersService';

const route = useRoute();
const router = useRouter();

const userId = route.params.id;

const form = reactive({
    name: '',
    email: '',
    address: '',
    longitude: '',
    latitude: ''
})

onMounted( async () => {
    try {
        const response = await getUserById(userId);
        form.name = response.data.name;
        form.email = response.data.email;
        form.address = response.data.address;
        form.longitude = response.data.longitude;
        form.latitude = response.data.latitude;
    } catch (error) {
        console.log("Error fetching user", error);
    }
})

// const editUser = async (userId, event) => {
//   try {
//     if (event) {
//       event.preventDefault()
//     }

//     const response = await getUserById(userId)
//     console.log('response', response)
//     router.push('/' + userId)
//   } catch (error) {
//     console.error(`Error fetching userId ${userId}: ${error}`);
//   }
// }

const handleSubmit = async () => {
    const updateUser = {
        name: form.name,
        email: form.email,
        address: form.address,
        longitude: form.longitude,
        latitude: form.latitude
    }

    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, updateUser);
        router.push(`/users/${response.data.id}`);
    } catch (error) {
        console.error("Error updating user", error);
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