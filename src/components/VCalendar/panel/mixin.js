const panelMaxItems = 42;

export default {
  data() {
    return {
      nowYear: 0,
      nowMonth: 0,
      nowDate: 0,
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
      const date = dayBeforeFirsDayInCurrentMonth.getDate()
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
    getNewDateByMonth(y, m, c, add) {
      const dateObj = new Date(
        y + add,
        m,
        c
      )
      return {
        year: dateObj.getFullYear(),
        mont: dateObj.getMonth(),
        date: dateObj.getDate()
      }
    },
    getNewDateYear(y, m, c, add) {
      const dateObj = new Date(
        y,
        m + add,
        c
      )
      return {
        year: dateObj.getFullYear(),
        mont: dateObj.getMonth(),
        date: dateObj.getDate()
      }
    }
  }
}