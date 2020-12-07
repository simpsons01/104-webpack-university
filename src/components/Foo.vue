<template>
  <div class="Foo">
    this is dynamic component
    {{ test }}
    <big-text />
  </div>
</template>

<script>
import { add } from "utility/add.js"
import BigText from "components/BigText.vue"
export default {
  name: "Foo",
  props:["test"],
  components: {
    BigText
  },
  mounted() {
    add(2, 3)
  }
}
</script>
