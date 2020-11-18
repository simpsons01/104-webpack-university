<template>
  <div class="Foo">
    Foo3
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "Foo3",
  mounted() {
    add(2, 3)
  }
}
</script>
