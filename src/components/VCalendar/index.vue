<template>
  <component :is="name" />
</template>


<script>
import RangeCalendar from "./RangeCalendar.vue";
import SingleCalendar from "./SingleCalendar.vue";

export default {
  name: "VCalendar",
  props: {
    rangeOn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      return this.rangeOn ? "RangeCalendar" : "SingleCalendar"
    }
  },
  components: {
    RangeCalendar,
    SingleCalendar
  }
};
</script>