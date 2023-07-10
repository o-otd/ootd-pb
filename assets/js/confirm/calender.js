const monthObject = {
	1: 'Jan',
	2: 'Feb',
	3: 'Mar',
	4: 'Apr',
	5: 'May',
	6: 'Jun',
	7: 'Jul',
	8: 'Aug',
	9: 'Sep',
	10: 'Oct',
	11: 'Nov',
	12: 'Dec'
}

class Calender {
	#rootElem
	#date

	constructor({ rootElem, date }){
		this.#rootElem = rootElem
		this.#date = date

		this.CalenderUI = new CalenderDraw(this.#date);
		this.CalenderEvent = new CalenderEvent({
      date: this.#date,
      rootElem: this.#rootElem,
			ui: this.CalenderUI
    });
	}
}


class CalenderDraw {
  currentMonth;
  currentYear;
	rootElem;
	date;

  constructor(date) {
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
		this.date = date

    this.render(this.date);
  }

	transformMonth(month){
		return monthObject[month]
	}

  datePrint(date) {
    let dateHTML = "";

		const newDate = new Date(date)
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
			if (this.currentMonth < month) dateHTML += `<li><button>${i}</button></li>`;
      if (this.currentMonth > month ) dateHTML += `<li><button disabled>${i}</button></li>`;
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

class CalenderEvent {
	constructor({ date, rootElem, ui }){
		this.ui = ui
		this.date = date
		this.rootElem = rootElem
		
		this.eventHandler()
	}
  eventHandler() {
    this.rootElem.addEventListener("click", (event) => {
      if (event.target.closest(".calender-body__dayList"))
        this.dateClickHandler();
      if (event.target.closest(".calender-prev__btn"))
        this.prevCalenderHandler();
      if (event.target.closest(".calender-next__btn"))
        this.nextCalenderHandler();
    });
  }

  dateClickHandler() {
    this.selected && this.selected.classList.remove("selected");
    event.target.closest(".calender-body__dayList").classList.add("selected");
    this.selected = event.target.closest(".calender-body__dayList");
  }

  prevCalenderHandler() {
    this.ui.render(new Date(this.date.setMonth(this.date.getMonth() - 1)));
  }

  nextCalenderHandler() {
    this.ui.render(new Date(this.date.setMonth(this.date.getMonth() + 1)));
  }
}

new Calender({
  date: new Date(),
  rootElem: document.querySelector(".calender"),
});