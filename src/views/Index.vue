<template>
  <div>
    <HelloWorld />
    <h1>test checked</h1>
    <Foo />
  </div>
</template>

<script>
import HelloWorld from "components/HelloWorld.vue"
import lodash from "lodash"
import { add } from "utility/add.js"
import $ from "jquery"
import moment from "moment"

export default {
  name: "Index",
  components: {
    HelloWorld,
    Foo: () => import(/* webpackChunkName: "Foo" */ "components/Foo.vue")
  },
  methods: {
    testEs6Promise() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved")
        }, 1000)
      })
    }
  },
  async mounted() {
    moment().format(new Date().now);
    // $("h1").style("color", "blue")
    add(2, 3)
    const obj = { a: { b: "2" } }
    const {
      a: { b }
    } = obj
    await this.testEs6Promise()
    const e = lodash.isEmpty
    console.log(e({}))
  }
}
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
