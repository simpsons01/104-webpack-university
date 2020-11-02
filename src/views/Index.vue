<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "components/HelloWorld.vue"
import isEmpty from "lodash/isEmpty"

export default {
  name: "Index",
  components: {
    HelloWorld
  },
  mounted() {
    console.log(isEmpty({}))
  }
}
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
