<template>
  <div>
    <HelloWorld></HelloWorld>
    <h1>test hash chaned</h1>
  </div>
</template>

<script>
import HelloWorld from "components/HelloWorld.vue"
import lodash from "lodash"

export default {
  name: "Index",
  components: {
    HelloWorld
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
