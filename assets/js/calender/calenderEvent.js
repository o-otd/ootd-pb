export default class CalenderEvent {
  constructor({ date, rootElem, ui }) {
    this.ui = ui;
    this.date = date;
    this.rootElem = rootElem;

    this.eventHandler();
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
