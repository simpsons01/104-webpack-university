<template>
  <div
    ref="VCalendar__panel"
    class="VCalendar__panel"
  >
    <div class="VCalendar__panel__container">
       <div class="VCalendar__panel__container__top__control">
         <div class="VCalendar__panel__container__top__control__left">
           <button @click="setCurrentDateAndMonthListByMonth(-1)">&#8249;</button>
           <button @click="setCurrentDateAndMonthListByYear(-1)">&#171;</button>
         </div>
         <div class="VCalendar__panel__container__top__control__center">
            {{ topControlText }}
         </div>
         <div class="VCalendar__panel__container__top__control__right">
           <button @click="setCurrentDateAndMonthListByYear(1)">&#187;</button>
           <button @click="setCurrentDateAndMonthListByMonth(1)">&#8250;</button>
         </div>
       </div>
       <div class="VCalendar__panel__container__week">
          <div
            v-for="(week, index) in weeks"
            :key="index"
          >
            {{ week.text }}
          </div>
       </div>
       <div class="VCalendar__panel__container__date__wrapper">
          <div
            v-for="(item, index) in calcMonthList"
            :key="index"
            :class="{
              disabled: item.disabled,
              active: item.active,
              isToday: item.isToday
            }"
            @click="onDatePick(item)"
          >
           {{ item.date }}
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import panelMixin from "../lib/mixin";
import { weeks } from "../lib/enum";
import {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
} from "../lib/utility";
export default {
  props: {
    defaultVal: {
      type: Object,
      default: () => ({ year: 0, month: 0, date: 0 })
    }
  },
  mixins: [panelMixin],
  data() {
    return {
      weeks,
      current: {
        year: 0,
        month: 0,
        date: 0
      },
      monthDateList: [],
    };
  },
  mounted() {
    if(validDate(this.defaultVal)) {
      this.setCurrnetDate(
        this.defaultVal.year,
        this.defaultVal.month,
        this.defaultVal.date
      )
    }else {
      this.setCurrnetDate(
        this.now.year,
        this.now.month,
        this.now.date
      )
    }
    this.setCurrentMonthList(
      this.current.year,
      this.current.month
    )
  },
  computed: {
    topControlText() {
      return this.current.year  + "年" + (this.current.month * 1 + 1) + "月"
    },
    calcMonthList() {
      return this.monthDateList.map(item => {
        return {
          ...item,
          disabled: item.month !== this.current.month,
          active: stringifyDate(item) === stringifyDate(this.current),
          isToday: stringifyDate(item) === stringifyDate(this.now)
        }
      })
    }
  },
  methods: {
    setCurrnetDate(year, month, date) {
      this.current = {
        year,
        month,
        date
      }
    }, 
    setCurrentMonthList(year, month) {
      this.monthDateList = getMonthList(year, month)
    },
    setCurrentDateAndMonthListByMonth(add) {
      const { year, month, date } = getNewDateByMonth(this.current, add)
      this.setCurrnetDate(
        year,
        month,
        date
      )
      this.setCurrentMonthList(
        year,
        month
      )
    },
    setCurrentDateAndMonthListByYear(add) {
      const { year, month, date } = getNewDateByYear(this.current, add)
      this.setCurrnetDate(
        year,
        month,
        date
      )
      this.setCurrentMonthList(
        year,
        month
      )
    },
    onDatePick(val) {
      this.$emit("onDatePick", val)
    }
  }
};
</script>

<style lang="scss" scoped>
@import  '../variables';

.VCalendar__panel {
  background-color: $white;
  &__container {
    padding: 20px;
    width: 300px;
    color: #292929;
    position: relative;
    z-index: 2;
    overflow: hidden;
    &__top__control {
      display: flex;
      &__left , &__right {
        > button {
          padding: 5px 7px 7px 7px;
          font-size: 18px;
          background-color: transparent;
          border: 0;
          outline: none;
          line-height: 18px;
          cursor: pointer;
        }
      }
      &__center {
        font-size: 18px;
        text-align: center;
        flex: 1 0 auto;
        line-height: 30px;
      }
    }
    &__week {
      display: flex;
      > div {
        padding: 8px 0;
        max-width: (100% / 7);
        font-size: 12px;
        text-align: center;
        flex: 0 0 (100% / 7);
      }
    }
    &__date__wrapper {
      display: flex;
      flex-wrap: wrap;
      > div {
        padding-bottom: 10px;
        max-width: (100% / 7);
        font-size: 12px;
        text-align: center;
        flex: 0 0 (100% / 7);
        cursor: pointer;
        position: relative;
        z-index: 1;
        &:hover, &.isToday {
          color: #409eff
        }
        &.disabled {
          color: #ddd
        }
        &.active {
          color: $white;
          &::before {
            content: "";
            display: inline-block;
            position: absolute;
            left: 51%;
            top: 32%;
            transform: translate(-50%, -50%);
            background-color:#409eff;
            border-radius: 100%;
            z-index: -1;
            width: 25px;
            height: 25px;
          }
        }
      }
      > div:nth-child(n + 36) {
        padding-bottom: 0;
      }
    }
  }
}
</style>
