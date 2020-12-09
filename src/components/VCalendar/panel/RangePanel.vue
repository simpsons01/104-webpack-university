<template>
  <div class="VCalendar__panel">
    <div class="VCalendar__panel__previous">
      <div class="VCalendar__panel__previous__top__control">
        <div class="VCalendar__panel__previous__top__control__left">
          <button @click="setCurrentDateAndMonthListByYear(-1)">&#8249;</button>
          <button @click="setCurrentDateAndMonthListByMonth(-1)">&#171;</button>
        </div>
        <div class="VCalendar__panel__previous__top__control__center">
          {{ topPreviousControlText }}
        </div>
      </div>
      <div class="VCalendar__panel__previous__week">
        <div v-for="(week, index) in weeks" :key="index">
          {{ week.text }}
        </div>
      </div>
      <div
        class="VCalendar__panel__previous__date__wrapper"
        :class="{
          startPick: isStartPickRange,
        }"
      >
        <div
          v-for="(item, index) in calcPreviousMonthList"
          :key="index"
          :class="{
            disabled: item.disabled,
            active: item.active,
            isToday: item.isToday,
            inrange: item.isInHoverRange,
          }"
          @click="onDatePick(item)"
          @mouseover="onDateHover(item)"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
    <div class="VCalendar__panel__present">
      <div class="VCalendar__panel__present__top__control">
        <div class="VCalendar__panel__present__top__control__center">
          {{ topPresentControlText }}
        </div>
        <div class="VCalendar__panel__present__top__control__right">
          <button @click="setCurrentDateAndMonthListByMonth(1)">&#187;</button>
          <button @click="setCurrentDateAndMonthListByYear(1)">&#8250;</button>
        </div>
      </div>
      <div class="VCalendar__panel__present__week">
        <div v-for="(week, index) in weeks" :key="index">
          {{ week.text }}
        </div>
      </div>
      <div
        class="VCalendar__panel__present__date__wrapper"
        :class="{
          startPick: isStartPickRange,
        }"
      >
        <div
          v-for="(item, index) in calcPresentMonthList"
          :key="index"
          :class="{
            disabled: item.disabled,
            active: item.active,
            isToday: item.isToday,
            inrange: item.isInHoverRange,
          }"
          @click="onDatePick(item)"
          @mouseover="onDateHover(item)"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelMixin from "./mixin";
import { weeks } from "./enum";

export default {
  props: {
    defaultStartVal: {
      type: String,
      default: "",
    },
    defaultEndVal: {
      type: String,
      default: "",
    },
  },
  mixins: [panelMixin],
  data() {
    return {
      weeks,
      previousMonthDateList: [],
      presentMonthDateList: [],
      previous: {
        currentYear: 0,
        currentMonth: 0,
        currentDate: 0,
      },
      present: {
        currentYear: 0,
        currentMonth: 0,
        currentDate: 0,
      },
      startPickDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      endPickDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      hoverDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      isStartPickRange: false,
    };
  },
  mounted() {
    this.setCurrnetDate("previous", this.nowYear, this.nowMonth, this.nowDate);
    this.setCurrentMonthList("previous", this.nowYear, this.nowMonth);
    const nextMonthDateObj = new Date(
      this.nowYear,
      this.nowMonth + 1,
      this.nowDate
    );
    this.setCurrnetDate(
      "present",
      nextMonthDateObj.getFullYear(),
      nextMonthDateObj.getMonth(),
      nextMonthDateObj.getDate()
    );
    this.setCurrentMonthList(
      "present",
      nextMonthDateObj.getFullYear(),
      nextMonthDateObj.getMonth()
    );
  },
  computed: {
    topPreviousControlText() {
      return (
        this.previous.currentYear +
        "年" +
        (this.previous.currentMonth * 1 + 1) +
        "月"
      );
    },
    topPresentControlText() {
      return (
        this.present.currentYear +
        "年" +
        (this.present.currentMonth * 1 + 1) +
        "月"
      );
    },
    calcStartPickDateStr() {
      return `${this.startPickDate.year}/${this.startPickDate.month}/${this.startPickDate.date}`;
    },
    calcEndPickDateStr() {
      return `${this.endPickDate.year}/${this.endPickDate.month}/${this.endPickDate.date}`;
    },
    calcStartDefaultVal() {
      const [year, month, date] = this.defaultStartVal
        ? this.defaultStartVal.split("/")
        : [-1, -1, -1];
      return [year * 1, month * 1, date * 1];
    },
    calcEndDefaultVal() {
      const [year, month, date] = this.defaultEndVal
        ? this.defaultEndVal.split("/")
        : [-1, -1, -1];
      return [year * 1, month * 1, date * 1];
    },
    calcPreviousMonthList() {
      return this.formatMonthListHelper(
        this.previousMonthDateList,
        this.previous.currentMonth,
        `${this.nowYear}/${this.nowMonth}/${this.nowDate}`
      ).map((item) => {
        const dateStr = `${item.year}/${item.month}/${item.date}`;
        const active =
          this.calcStartPickDateStr === dateStr ||
          this.calcEndPickDateStr === dateStr;
        return {
          ...item,
          active,
          isInHoverRange:
            this.isStartPickRange &&
            !item.disabled &&
            !active &&
            this.getIsDateBeHindCompareDate(this.hoverDate, item),
        };
      });
    },
    calcPresentMonthList() {
      return this.formatMonthListHelper(
        this.presentMonthDateList,
        this.present.currentMonth,
        "",
        `${this.nowYear}/${this.nowMonth}/${this.nowDate}`
      ).map((item) => {
        const dateStr = `${item.year}/${item.month}/${item.date}`;
        const active =
          this.calcStartPickDateStr === dateStr ||
          this.calcEndPickDateStr === dateStr;
        return {
          ...item,
          active,
          isInHoverRange:
            this.isStartPickRange &&
            !item.disabled &&
            !active &&
            this.getIsDateBeHindCompareDate(this.hoverDate, item),
        };
      });
    },
  },
  methods: {
    setCurrnetDate(type, year, month, date) {
      const obj = {
        currentYear: year,
        currentMonth: month,
        currentDate: date,
      };
      if (type === "previous") {
        this.previous = { ...obj };
      } else {
        this.present = { ...obj };
      }
    },
    setCurrentMonthList(type, year, month) {
      if (type === "previous") {
        this.previousMonthDateList = this.getMonthList(year, month);
      } else {
        this.presentMonthDateList = this.getMonthList(year, month);
      }
    },
    setCurrentDateAndMonthListByMonth(add) {
      const {
        year: previousY,
        month: previousM,
        date: previousD,
      } = this.getNewDateByMonth(
        this.previous.currentYear,
        this.previous.currentMonth,
        this.previous.currentDate,
        add
      );
      const {
        year: presentY,
        month: presentM,
        date: presentD,
      } = this.getNewDateByMonth(previousY, previousM, previousD, 1);
      this.setCurrnetDate("previous", previousY, previousM, previousD);
      this.setCurrnetDate("present", presentY, presentM, presentD);
      this.setCurrentMonthList("previous", previousY, previousM);
      this.setCurrentMonthList("present", presentY, presentM);
    },
    setCurrentDateAndMonthListByYear(add) {
      const {
        year: previousY,
        month: previousM,
        date: previousD,
      } = this.getNewDateByYear(
        this.previous.currentYear,
        this.previous.currentMonth,
        this.previous.currentDate,
        add
      );
      const {
        year: presentY,
        month: presentM,
        date: presentD,
      } = this.getNewDateByYear(previousY, previousM, previousD, 1);
      this.setCurrnetDate("previous", previousY, previousM, previousD);
      this.setCurrnetDate("present", presentY, presentM, presentD);
      this.setCurrentMonthList("previous", previousY, previousM);
      this.setCurrentMonthList("present", presentY, presentM);
    },
    onDatePick({ year, month, date }) {
      if (!this.isStartPickRange) {
        this.isStartPickRange = true;
        this.endPickDate = { year: "", month: "", date: "" };
        this.startPickDate = { year, month, date };
        return;
      } else {
        this.endPickDate = { year, month, date };
        this.$emit("onDatePick", {
          start: `${this.startPickDate.year}/${this.startPickDate.month}/${this.startPickDate.date}`,
          end: `${this.endPickDate.year}/${this.endPickDate.month}/${this.endPickDate.date}`,
        });
      }
    },
    onDateHover({ year, month, date, disabled}) {
      if(this.isStartPickRange && disabled) return
      this.hoverDate = { year, month, date };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";

%active {
  color: $white;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: -3px;
    bottom: 6px;
    background-color: #f2f8ff;
    z-index: -2;
  }
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 51%;
    top: 32%;
    transform: translate(-50%, -50%);
    background-color: #409eff;
    border-radius: 100%;
    z-index: -1;
    width: 25px;
    height: 25px;
  }
}

.VCalendar__panel {
  background-color: $white;
  display: flex;
  &__previous,
  &__present {
    padding: 20px 10px;
    width: 300px;
    color: #292929;
    position: relative;
    z-index: 2;
    overflow: hidden;
    &__top__control {
      display: flex;
      &__left,
      &__right {
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

      &.startPick {
        > div:not(.disabled):hover{
          @extend %active;
          &::after {
            left: 0px;
            right: 10px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
      > div {
        padding-bottom: 10px;
        max-width: (100% / 7);
        font-size: 12px;
        text-align: center;
        flex: 0 0 (100% / 7);
        cursor: pointer;
        position: relative;
        z-index: 1;
        &:hover,
        &.isToday {
          color: #409eff;
        }
        &.disabled {
          color: #ddd;
        }
        &.active {
          @extend %active;
          &::after {
            left: 10px;
            right: 0px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
        }
        &.inrange {
          &::before {
            content: "";
            display: inline-block;
            position: absolute;
            left: 0px;
            right: 0px;
            top: -3px;
            bottom: 6px;
            background-color: #f2f8ff;
            z-index: -1;
          }
        }
      }
      > div:nth-child(n + 36) {
        padding-bottom: 0;
      }
    }
  }
  &__previous {
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 1px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-color: #d2d0d0;
    }
  }
}
</style>
