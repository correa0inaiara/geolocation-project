<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
        <!-- <RouterLink to="/regions">Regions</RouterLink>
        <RouterLink to="/searchByDistance">Search By Distance</RouterLink>
        <RouterLink to="/searchByPoint">Search By Point</RouterLink> -->
      </nav>
    </div>

  </header>
</template>