export default (isRangeOn) => {
  if(isRangeOn) {
    return {
      data() {
        return {
          selectedVal: {
            year: 0,
            month: 0,
            date: 0,
          },
        }
      },
      computed: {
        inputViewText() {
          const { year, month, date } = this.selectedVal;
          if (year && month && date) {
            return `${year}/${month}/${date}`;
          } else {
            return "";
          }
        },
        onDatePickeHandler(val) {
          this.selectedVal = { ...val };
          this.isPanelShow = false;
        },
      },
    }
  }else {
    return {

    }
  }
}