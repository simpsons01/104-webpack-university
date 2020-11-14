<template>
  <div id="app">
    <router-link to="/about">
      about
    </router-link>
    <p>test auto deploy</p>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    addFuncA() {
      console.log("add func a")
    },
    addFuncB() {
      console.log("add func b")
    },
    addFuncC() {
      console.log("add func c")
    },
  }
}
</script>

<style lang="scss">
#app {
  break-inside: avoid;
  display: grid;
}
</style>
