<template>
  <NavbarComponent />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import NavbarComponent from './NavbarComponent.vue';

export default defineComponent({
  name: "HeaderComponent",
  components: { NavbarComponent }
})
</script>

<style scoped>

</style>