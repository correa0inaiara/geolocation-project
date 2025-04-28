<template>
  <section id="credits" class="credits columns">
    <header class="column">
      <h1 class="title">Credits</h1>
      <h3 class="subtitle">Below you will find all the credits for this website</h3>
    </header>
    <main class="column">
      <ul>
        <li v-for="credit in credits" :key="credit.id">
          <span class=""><strong>Name: </strong>{{ credit.name }}</span>
          <span class=""><strong>Reference: </strong>{{ credit.reference }}</span>
        </li>
      </ul>
    </main>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CreditsView",
  data() {
    return {
      credits: []
    }
  },
  mounted() {
    const credit = {
      id: '1',
      name: 'Logo',
      reference: 'Image by <a href="https://pixabay.com/users/maiconfz-1424200/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1272165">Maicon Fonseca Zanco</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1272165">Pixabay</a>'
    }
    this.credits.push(credit)
    console.log("this.credits", this.credits)
  }
})
</script>

<style scoped>

</style>