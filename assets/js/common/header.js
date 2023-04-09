class HeaderScroll {
	#element
	constructor(element){
		this.#element = element;
		this.scrollHandler();
	}

	scrollHandler(){
		window.addEventListener('scroll', this.isScroll.bind(this));
	}

	isScroll(){
		const FIXED_SIZE = 51
		return pageYOffset > FIXED_SIZE ? this.addClass() : this.removeClass()
	}

	addClass(){
		document.body.classList.add('scrolling')
	}

	removeClass(){
		document.body.classList.remove('scrolling')
	}
}

const headerElem = document.querySelector('.header');
const header = new HeaderScroll(headerElem);
