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
        :value="viewStartDate"
      />
      <span class="VCalendar__input__tilde">~</span>
      <input
        class="VCalendar__input__end"
        type="text"
        autocomplete="off"
        readonly
        :value="viewEndDate"
      />
    </div>
    <transition name="panel">
      <div class="VCalendar__panel__wrapper" v-if="isPanelShow">
        <RangePanel
          ref="VCalendar__panel"
          :defaultStartVal="startDate"
          :defaultEndVal="endDate"
          @onDatePick="onDatePick"
        />
      </div>
    </transition>
  </div>
</template>


<script>
import RangePanel from "./panel/RangePanel.vue";
import { 
  stringifyDate,
  parseStrDate,
  validDate
} from "./lib/utility"


export default {
  name: "RangeCalendar",
  components: {
    RangePanel,
  },
  data() {
    return {
      isPanelShow: false,
      startDate: {
        year: 0,
        month: 0,
        date: 0
      },
      endDate: {
        year: 0,
        month: 0,
        date: 0
      },
    };
  },
  computed: {
     viewStartDate() {
       const date = {
         ...this.startDate,
         month: this.startDate.month + 1
       }
       return validDate(this.startDate) ? stringifyDate(date) : ""
     },
     viewEndDate() {
       const date = {
         ...this.endDate,
         month: this.endDate.month + 1
       }
       return validDate(this.endDate) ? stringifyDate(date) : ""
     }
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
    onDocumentClickHandler(e) {
      if (
        this.$refs["VCalendar__panel"].$el.contains(e.target) ||
        this.$refs["VCalendar"].contains(e.target)
      )
        return;
      this.isPanelShow = false;
    },
    onDatePick({ start, end }) {
      this.startDate = { ...start }
      this.endDate = { ...end }
      this.isPanelShow = false
    }
  },
};
</script>

<style lang="scss" scoped>
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
  margin: 150px;
  padding: 4px 10px;
  width: 250px;
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
    &__start,
    &__end {
      box-sizing: border-box;
      padding: 7px 14px;
      max-width: 50%;
      font-size: 12px;
      background-color: $gray;
      border: 0;
      outline: none;
      appearance: none;
      flex: 0 0 50%;
      line-height: 16px;
      letter-spacing: 1.5px;
      text-align: center;
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
