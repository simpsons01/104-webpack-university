<template>
  <div class="about">
    this is about page
    <Foo />
    <p>123</p>
  </div>
</template>

<script>
import $ from "jquery"
import { add } from "utility/add.js"
import moment from "moment"

export default {
  name: "About",
  components: {
    Foo: () => import(/* webpackChunkName: "Foo" */ "components/Foo.vue")
  },
  mounted() {
    moment().format(new Date().now);
    const add1 = add(1, 2)
    $("div.about").style("color", "black")
  }
}
</script>

<style></style>
