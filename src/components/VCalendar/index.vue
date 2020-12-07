<script>
import Vue from 'vue';
import Panel from './panel.vue';

export default {
  name: 'VCalendar',
  data() {
    return {
      isPannelShow: false,
      pannelEl: null,
      selectedVal: {
        year: 0,
        month: 0,
        date: 0
      }
    }
  },
  computed: {
    inputViewText() {
      const { year, month, date } = this.selectedVal
      if(year && month && date) {
        return `${year}/${month}/${date}`
      }else {
        return ""
      } 
    }
  },
  watch: {
    isPannelShow(newVal) {
      if(newVal) {
       this.appendPannel()
       document.addEventListener("click", this.onDocumentClickHandler)
      }else {
       this.removePannel()
       document.removeEventListener("click", this.onDocumentClickHandler)
      }
    }
  },
  methods: {
    togglePanel() {
      this.isPannelShow = !this.isPannelShow
    },
    async appendPannel() {
      await this.$nextTick();
      const { bottom: VCalendarBottom, left: VCalendarLeft } = this.$refs.VCalendar.getBoundingClientRect();
      const propsData = { 
        top: VCalendarBottom, 
        left: VCalendarLeft
      }
      if(
        this.selectedVal.year && 
        this.selectedVal.month &&
        this.selectedVal.date
      ) {
        propsData.defaultVal = `${this.selectedVal.year}/${this.selectedVal.month}/${this.selectedVal.date}`
      }
      const CalanderPanel = Vue.extend(Panel);
      this.pannelEl = new CalanderPanel({ propsData }).$mount();
      document.body.appendChild(this.pannelEl.$el);
      this.pannelEl.$on("onDatePick", this.onDatePickeHandler)
    },
    removePannel() {
      document.body.removeChild(this.pannelEl.$el)
      this.pannelEl.$off("onDatePick", this.onDatePickeHandler)
      this.pannelEl.$destroy()
      this.pannelEl = null
    },
    async onDatePickeHandler(val) {
      this.selectedVal = { ...val }
      await this.$nextTick()
      this.isPannelShow = false
    },
    onDocumentClickHandler(e) {
      if(
        this.pannelEl.$refs["VCalendar__panel"].contains(e.target) ||
        this.$refs["VCalendar"].contains(e.target)
      ) return
      this.isPannelShow = false
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
