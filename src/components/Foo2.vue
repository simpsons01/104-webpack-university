<template>
  <div class="Foo">
    Foo2
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
