<template>
  <div
    ref="VCalendar__panel"
    class="VCalendar__panel"
    :style="{
      left: `${left}px`,
      top: `${top}px`
    }"
    :class="{
      expand: isMounted
    }"
  >
    <div class="VCalendar__panel__previous">
       <div class="VCalendar__panel__previous__top__control">
         <div class="VCalendar__panel__previous__top__control__left">
           <button @click="setCurrentDateAndMonthListByMonth(-1)">&#8249;</button>
           <button @click="setCurrentDateAndMonthListByYear(-1)">&#171;</button>
         </div>
         <div class="VCalendar__panel__previous__top__control__center">
            {{ topControlText }}
         </div>
         <div class="VCalendar__panel__previous__top__control__right">
           <button @click="setCurrentDateAndMonthListByYear(1)">&#187;</button>
           <button @click="setCurrentDateAndMonthListByMonth(1)">&#8250;</button>
         </div>
       </div>
       <div class="VCalendar__panel__previous__week">
          <div
            v-for="(week, index) in weeks"
            :key="index"
          >
            {{ week.text }}
          </div>
       </div>
       <div class="VCalendar__panel__previous__date__wrapper">
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
const panelMaxItems = 42;

export default {
  props: {
    left: {
      type: Number,
      default: 0
    }, 
    top: {
      type: Number,
      default: 0
    },
    defaultVal: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      weeks: [
        {
          weekIndex: 0,
          text: '日',
        },
        {
          weekIndex: 1,
          text: '一',
        },
        {
          weekIndex: 2,
          text: '二',
        },
        {
          weekIndex: 3,
          text: '三',
        },
        {
          weekIndex: 4,
          text: '四',
        },
        {
          weekIndex: 5,
          text: '五',
        },
        {
          weekIndex: 6,
          text: '六',
        },
      ],
      isMounted: false,
      nowYear: 0,
      nowMonth: 0,
      nowDate: 0,
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0,
      monthDateList: [],
    };
  },
  mounted() {
    const dateObj = new Date()
    this.nowYear = dateObj.getFullYear(),
    this.nowMonth = dateObj.getMonth(),
    this.nowDate = dateObj.getDate()
    if(this.calcDefaultVal.every(x => x > 0)) {
      this.setCurrnetDate(
        this.calcDefaultVal[0],
        this.calcDefaultVal[1] - 1,
        this.calcDefaultVal[2]
      )
    }else {
      this.setCurrnetDate(
        this.nowYear,
        this.nowMonth,
        this.nowDate
      )
    }
    this.setCurrentMonthList(
      this.currentYear,
      this.currentMonth
    )
  },
  computed: {
    topControlText() {
      return this.currentYear  + "年" + (this.currentMonth * 1 + 1) + "月"
    },
    calcDefaultVal() {
      const [year, month, date] = this.defaultVal ? this.defaultVal.split("/") : [-1, -1, -1] 
      return [year * 1, month * 1, date * 1]
    },
    calcMonthList() {
      return this.monthDateList.map(item => {
        return {
          ...item,
          disabled: item.month !== this.currentMonth + 1,
          active: (
            item.year === this.calcDefaultVal[0] &&
            item.month === this.calcDefaultVal[1] &&
            item.date === this.calcDefaultVal[2]
          ),
          isToday: (
            item.year === this.nowYear &&
            item.month === this.nowMonth + 1 &&
            item.date === this.nowDate
          )
        }
      })
    }
  },
  methods: {
    getMonthList(calcYear, calcMonth) {
      const firsDayInCurrentMonth = new Date(
        calcYear,
        calcMonth,
        1
      );
      const firstDayInWeek = firsDayInCurrentMonth.getDay()
      const dayBeforeFirsDayInCurrentMonth = new Date(
        calcYear,
        calcMonth,
        (1 - (firstDayInWeek ? firstDayInWeek : 7))
      )
      const year = dayBeforeFirsDayInCurrentMonth.getFullYear()
      const month = dayBeforeFirsDayInCurrentMonth.getMonth()
      const date =  dayBeforeFirsDayInCurrentMonth.getDate()
      const ary = [];
      for (let i = 0; i < panelMaxItems; i += 1) {
        const dateObj = new Date(
          year, month, date + i
        );
        ary.push({
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
          date: dateObj.getDate(),
        });
      }
      return ary
    },
    setCurrnetDate(year, month, date) {
      this.currentYear = year
      this.currentMonth = month
      this.currentDate = date
    }, 
    setCurrentMonthList(year, month) {
      this.monthDateList = this.getMonthList(year, month)
    },
    setCurrentDateAndMonthListByMonth(add) {
      const dateObj = new Date(
        this.currentYear + add,
        this.currentMonth,
        this.currentDate
      )
      const year = dateObj.getFullYear()
      const month = dateObj.getMonth()
      const date = dateObj.getDate()
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
      const dateObj = new Date(
        this.currentYear,
        this.currentMonth + add,
        this.currentDate
      )
      const year = dateObj.getFullYear()
      const month = dateObj.getMonth()
      const date = dateObj.getDate()
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
@import  './variables';

.VCalendar__panel {
  position: absolute;
  background-color: $white;
  box-shadow: 0 0 4px 0 #a9a9a9;
  transform: translateY(15px);
  z-index: 9999;
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
    border-color: #fff #fff transparent transparent;
    box-shadow: -1px -1px 2px #d4d1d1;
    transform: rotate(45deg);
    z-index: -1;
  }
  &__previous {
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
