<script setup>
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import Post from '@/components/Post.vue';

const state = reactive({
    posts: []
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/posts');
    state.posts = response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
});
</script>
<template>
  <div class="center-container"> 
    <RouterLink :to="`/posts/add`" class="btn btn-green">New User</RouterLink>
    <br />
    <br />
    <table id="users">
      <thead>
        <tr>
            <th>S.N</th>
            <th>Title</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <Post v-for="post in state.posts" :key="post.id" :post="post"/>
      </tbody>
    </table>
  </div>
</template>