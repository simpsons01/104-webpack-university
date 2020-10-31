<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "components/HelloWorld.vue";

export default {
  name: "Index",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
