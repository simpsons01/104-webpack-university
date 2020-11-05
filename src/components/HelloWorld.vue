<template>
  <div class="test">
    hello world
    <Foo />
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "HelloWorld",
  components: {
    Foo: () => import(/* webpackChunkName: "Foo" */ "components/Foo.vue")
  },
  mounted() {
    add(1, 2)
  }
}
</script>
