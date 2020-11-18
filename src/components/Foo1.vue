<template>
  <div class="Foo">
    this is dynamic component
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
