<template>
  <div class="Foo">
    Foo2
    <h1>add Text......</h1>
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "Foo2",
  mounted() {
    add(2, 3)
  }
}
</script>
