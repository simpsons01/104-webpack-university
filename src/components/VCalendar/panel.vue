<template>
  <div
    class="VCalendar__panel"
    :style="{
      left: `${left}px`,
      top: `${top}px`
    }"
  >
    <div class="VCalendar__panel__previous">
       <div class="VCalendar__panel__previous__top__control">
         <div class="VCalendar__panel__previous__top__control__left">
           <button @click="setCurrentDateAndMonthListByMonth(-1)">&#8249;</button>
           <button @click="setCurrentDateAndMonthListByYear(-1)">&#171;</button>
         </div>
         <div class="VCalendar__panel__previous__top__control__center">
            {{ currentYear }} 年 {{ currentMonth + 1 }} 月
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
            v-for="(item, index) in monthDateList"
            :key="index"
            :class="{
              disabled: item.month  !== currentMonth + 1
            }"
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
  props: ['left', 'top'],
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
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0,
      monthDateList: [],
    };
  },
  mounted() {
    const date = new Date()
    this.setCurrnetDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    this.setCurrentMonthList(
      this.currentYear,
      this.currentMonth
    )
  },
  methods: {
    getMonthList(calcYear, calcMonth) {
      const firsDayInCurrentMonth = new Date(
        calcYear,
        calcMonth,
        1
      );
      const dayBeforeFirsDayInCurrentMonth = new Date(
        calcYear,
        calcMonth,
        1 - firsDayInCurrentMonth.getDay()
      );
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
  &__previous {
    padding: 15px;
    width: 300px;
    color: #292929;
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
        padding-bottom: 8px;
        max-width: (100% / 7);
        font-size: 12px;
        text-align: center;
        flex: 0 0 (100% / 7);

        &.disabled {
          color: #ddd
        }
      }
    }
  }
}
</style>
