<script>
import Vue from 'vue';
import Panel from './panel.vue';

export default {
  name: 'VCalendar',
  async mounted() {
    await this.$nextTick();
    const { bottom, left } = this.$refs.VCalendar.getBoundingClientRect();

    const CalanderPanel = Vue.extend(Panel);

    const calanderPanelInstance = new CalanderPanel({
      propsData: { top: bottom, left },
    }).$mount();

    document.body.appendChild(calanderPanelInstance.$el);
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
