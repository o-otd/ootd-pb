const monthObject = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export default class CalenderDraw {
  currentMonth;
  currentYear;
  rootElem;
  date;

  constructor(date) {
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
    this.date = date;

    this.render(this.date);
  }

  transformMonth(month) {
    return monthObject[month];
  }

  datePrint(date) {
    let dateHTML = "";

    const newDate = new Date(date);
    const adjDate = new Date(newDate).getDate();
    const year = new Date(newDate).getFullYear();
    const month = new Date(newDate).getMonth() + 1;
    const firstDay = new Date(newDate.setDate(1)).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    const limitDay = firstDay + lastDay;
    const nextDay = Math.ceil(limitDay / 7) * 7;

    for (let i = 0; i < firstDay; i++) {
      dateHTML += `<li class="calender-empty"></li>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (this.currentMonth < month)
        dateHTML += `<li><button>${i}</button></li>`;
      if (this.currentMonth > month)
        dateHTML += `<li><button disabled>${i}</button></li>`;
      if (this.currentMonth === month) {
        const isDisabled = adjDate > i ? "disabled" : "";
        dateHTML += `<li class="calender-body__dayList"><button ${isDisabled}>${i}</button></li>`;
      }
    }

    for (let i = limitDay; i < nextDay; i++) {
      dateHTML += `<li class="calender-empty"></li>`;
    }

    return { dateHTML, month, year };
  }

  render(date) {
    const { dateHTML, month, year } = this.datePrint(date);
    document.querySelector(`.calender-body__date`).innerHTML = dateHTML;
    document.querySelector(
      `.calender-header__year span`
    ).innerText = `${this.transformMonth(month)} ${year}`;
  }
}
