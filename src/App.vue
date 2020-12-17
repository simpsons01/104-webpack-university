<template>
  <div id="app">
    <VCalendar  :rangeOn="true" />
  </div>
</template>

<script>
import VCalendar from "components/VCalendar/index.vue"
export default {
  data() {
    return {
      test: 2
    }
  },
  components: {
    VCalendar
  },
  mounted() {
    setTimeout(()=>{
      this.test = 4
    }, 2000)
  }
}
</script>

<style lang="scss">
#app {
  break-inside: avoid;
  display: grid;
}
</style>
