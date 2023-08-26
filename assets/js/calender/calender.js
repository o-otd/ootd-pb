import CalenderDraw from "./calenderUi.js"
import CalenderEvent from "./calenderEvent.js"

export default class Calender {
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
