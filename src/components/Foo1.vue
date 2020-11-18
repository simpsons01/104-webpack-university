<template>
  <div class="Foo">
    this is dynamic component
    <h1>add Text......</h1>
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "Foo1",
  mounted() {
    add(2, 3)
  }
}
</script>
