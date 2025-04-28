<script setup>
import { getUserById } from '@/services/UsersService';
import { defineProps } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    user: Object
});

// const viewUser = async (userId, event) => {
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

const deleteUser = async (userId, event) => {
  try {
      if (event) {
        event.preventDefault()
      }
      
      console.log('userId', userId)
      const confirm = window.confirm('Are you sure you want to delete this user?');
      if(confirm) {
        const response = await getUserById(userId)
        console.log('response', response)
        router.push('/' + userId)
      }
  } catch (error) {
      console.error("Error deleting user: ", error);
  }
}
</script>
<template>
    <tr>
        <td>{{ user.name }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.longitude }} / {{ user.latitude }}</td>
        <td>
            <RouterLink :to="`/users/${user._id}`" class="btn btn-green">O</RouterLink>
            <RouterLink :to="`/users/edit/${user._id}`" class="btn btn-blue">/</RouterLink>
            <button @click="deleteUser(user._id)" class="btn btn-red">X</button>
        </td>
    </tr>
</template>