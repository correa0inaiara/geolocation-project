import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const user = ref({})
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return { user }
})
