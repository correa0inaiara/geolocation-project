<template>
  <div class="container">
    <HeaderComponent />
    <RouterView></RouterView>
    <FooterComponent />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default defineComponent({
  name: "App",
  components: { HeaderComponent, FooterComponent }
})
</script>

<style>

</style>