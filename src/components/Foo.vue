<template>
  <div class="Foo">
    this is dynamic component
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "Foo",
  mounted() {
    add(2, 3)
  }
}
</script>
