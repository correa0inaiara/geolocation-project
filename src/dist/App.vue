<!-- <script id="home" src="./Home.html"></script> -->
<!-- <script type="module" src="./router.js"></script> -->

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  import {router} from './router.js'
  // import { createRouter, createWebHistory, RouteRecordRaw } from 'https://unpkg.com/vue-router@4';
  // import Home from '../Home.vue';

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>