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
export default {}
</script>

<style lang="scss">
#app {
  break-inside: avoid;
  display: grid;
}
</style>
