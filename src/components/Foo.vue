<template>
  <div class="Foo">
    this is dynamic component
    {{ test }}
  </div>
</template>

<script>
import { add } from "utility/add.js"
export default {
  name: "Foo",
  props:["test"],
  mounted() {
    add(2, 3)
  }
}
</script>
