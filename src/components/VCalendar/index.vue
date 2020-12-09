<template>
  <RangeCalendar />
</template>


<script>
import RangeCalendar from "./RangeCalendar.vue";
//import SingleCalendar from "./panel/SingleCalendar";

export default {
  name: "VCalendar",
  props: {
    rangeOn: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    RangeCalendar
  }
};
</script>