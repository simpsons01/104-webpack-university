<template>
  <div
    ref="VCalendar"
    class="VCalendar"
    :class="{
      active: isPanelShow,
    }"
  >
    <div 
      class="VCalendar__input"
      @click="togglePanel"
    >
      <input
        ref="VCalendar__input__start"
        class="VCalendar__input__start"
        type="text"
        autocomplete="off"
        readonly
        :value="viewDate"
      />
    </div>
    <transition name="panel">
      <div class="VCalendar__panel__wrapper" v-if="isPanelShow">
        <SinglePanel
          ref="VCalendar__panel"
          :defaultVal="date"
          @onDatePick="onDatePickeHandler"
        />
      </div>
    </transition>
  </div>
</template>


<script>
import Vue from "vue";
import SinglePanel from "./panel/SinglePanel.vue";
import {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
} from "./lib/utility";

export default {
  name: "VCalendar",
  components: {
    SinglePanel,
  },
  data() {
    return {
      isPanelShow: false,
      date: {
        year: 0,
        month: 0,
        date: 0,
      },
    };
  },
  computed: {
     viewDate() {
       const date = {
         ...this.date,
         month: this.date.month + 1
       }
       return validDate(this.date) ? stringifyDate(date) : ""
     },
  },
  watch: {
    isPanelShow(newVal) {
      if (newVal) {
        document.addEventListener("click", this.onDocumentClickHandler);
      } else {
        document.removeEventListener("click", this.onDocumentClickHandler);
      }
    },
  },
  methods: {
    togglePanel() {
      this.isPanelShow = !this.isPanelShow;
    },
    onDatePickeHandler(val) {
      this.date = { ...val };
      this.isPanelShow = false;
    },
    onDocumentClickHandler(e) {
      if (
        this.$refs["VCalendar__panel"].$el.contains(e.target) ||
        this.$refs["VCalendar"].contains(e.target)
      )
        return;
      this.isPanelShow = false;
    },
  },
};
</script>

<style lang="scss">
@import "./variables";

.panel-enter-active,
.panel-leave-active {
  transition: 0.3s transform ease, 0.2s opacity ease;
}

.panel-enter,
.panel-leave-to {
  opacity: 0;
  transform: translateY(100%) scaleY(0) !important;
}

.panel-leave,
.panel-enter-to {
  opacity: 1;
  transform: translateY(100%) scaleY(1) !important;
}

.VCalendar {
  position: relative;
  margin: 150px auto;
  padding: 4px 10px;
  width: 150px;
  height: 40px;
  background-color: $gray;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid $gray;
  &.active {
    border: 1px solid #409eff;
  }
  &.active &__panel__wrapper {
    &::before {
      opacity: 1;
    }
  }
  &__input {
    display: flex;
    &.multi &__start, &.multi &__end {
      max-width: 50%;
      flex: 0 0 50%;
      text-align: center;
    }
    &__start,
    &__end {
      box-sizing: border-box;
      padding: 7px 14px;
      max-width: 100%;
      font-size: 12px;
      background-color: $gray;
      border: 0;
      outline: none;
      appearance: none;
      flex: 1 0 auto;
      line-height: 16px;
      letter-spacing: 1.5px;
    }
    &__tilde {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #b5abab;
    }
  }
  &__panel__wrapper {
    position: absolute;
    bottom: -15px;
    left: 0;
    transform: translateY(100%);
    transform-origin: top;
    box-shadow: 0 0 4px 0 #a9a9a9;
    display: flex;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: -5px;
      left: 10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 10px 0 0;
      border-color: $white $white transparent transparent;
      box-shadow: -1px -1px 2px #d4d1d1;
      transform: rotate(45deg);
      z-index: -1;
      opacity: 0;
      transition: 0.3s opacity ease-in-out;
    }
  }
}
</style>
