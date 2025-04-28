<script setup>
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { getUsers } from '@/services/UsersService';
import UserComponent from './UserComponent.vue';

// const state = reactive({
//     users: []
// })

onMounted(async () => {
  try {
    const response = await getUsers()
    console.log('response', response)
    state.users = response
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});


</script>
<template>
  <div class="center-container"> 
    <RouterLink :to="`/users/new`" class="btn btn-green">New User</RouterLink>
    <br />
    <br />
    <!-- <ul :data="tableData" style="width: 100%">
      <li>
        
      </li>
    </ul> -->
    <table id="users">
      <thead>
        <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Longitude / Latitude</th>
        </tr>
      </thead>
      <tbody>
        <UserComponent v-for="user in state.users" :key="user._id" :user="user"/>
      </tbody>
    </table>
  </div>
</template>