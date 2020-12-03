<template>
  <div id="app">
    <router-link to="/about">
      about
    </router-link>
    <p>test auto deploy</p>
    <router-view />
    <Foo 
     :test="test"
    />
  </div>
</template>

<script>
import Foo from "components/Foo.vue"
export default {
  data() {
    return {
      test: 2
    }
  },
  components: {
    Foo
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
