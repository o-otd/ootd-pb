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
	#currentYear;
	#currentMonth;
	#rootElem;
	#date;

	constructor({ rootElem, date }){
		this.#rootElem = rootElem;
		this.#date = date;
		this.#currentMonth = date.getMonth() + 1
		this.#currentYear = date.getFullYear();

		this.render(date);
		this.eventHandler();
	}

	transformMonth(month){
		return monthObject[month]
	}

	datePrint(date){
		console.log(date)

		let dateHTML = '';

		const adjDate = new Date(date).getDate();
		const year = new Date(date).getFullYear();
  	const month = new Date(date).getMonth() + 1;	
		const firstDay = new Date(date.setDate(1)).getDay();
  	const lastDay = new Date(year, month, 0).getDate();
		const limitDay = firstDay + lastDay;
		const nextDay = Math.ceil(limitDay / 7) * 7;

		for (let i = 0; i < firstDay; i++) {
			dateHTML += `<li class="calender-empty"></li>`;
		}
	
		for (let i = 1; i <= lastDay; i++) {
			if(this.#currentMonth > month) dateHTML += `<li><button disabled>${i}</button></li>`;
			if(this.#currentMonth <= month && this.#currentYear >= year){
				const isDisabled = adjDate > i ? "disabled" : ''
				dateHTML += `<li class="calender-body__dayList"><button ${isDisabled}>${i}</button></li>`;
			}

		}
	
		for (let i = limitDay; i < nextDay; i++) {
			dateHTML += `<li class="calender-empty"></li>`;
		}

		return { dateHTML, month, year }
	}

	render(date){
		const { dateHTML, month, year } = this.datePrint(date)
		document.querySelector(`.calender-body__date`).innerHTML = dateHTML
		document.querySelector(`.calender-header__year span`).innerText = `${this.transformMonth(month)} ${year}`;
	}

	eventHandler(){
		let selected;

		this.#rootElem.addEventListener('click', (event) => {

			if(event.target.closest('.calender-body__dayList')){
				selected && selected.classList.remove('selected')
				event.target.closest('.calender-body__dayList').classList.add('selected')
				selected = event.target.closest('.calender-body__dayList')
			}

			if(event.target.closest('.calender-prev__btn')){
				this.render(new Date(this.#date.setMonth(this.#date.getMonth() - 1)));
			}

			if(event.target.closest('.calender-next__btn')){
				this.render(new Date(this.#date.setMonth(this.#date.getMonth() + 1)));
			}

		})
	}
}

new Calender({
	date: new Date(),
	rootElem: document.querySelector('.calender'),
});
