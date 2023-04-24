const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");
const rangeLeft = document.querySelector(".range-controls__left");
const rangeRight = document.querySelector(".range-controls__right");
const rangeCalc = document.querySelector(".range-controls__calc");

const RANGE_GAP = 10;


class Range {
	listener(){}
	isNotRange(){}
	rangeCalculate(){}
}

class LeftRange extends Range {
	constructor(element){
		super();
		element.addEventListener('input', this.listener.bind(this));
	}

	listener(e){
		this.value = +e.target.value;
		this.min = +e.target.min
		this.max = +e.target.max
	
		this.value = this.isNotRange(+inputRight.value, this.value);
		this.rangeCalculate({ 
			value: this.value,
			min: this.min,
			max: this.max
		});
	}

	isNotRange(inputRightValue, value){
		return inputRightValue - value < RANGE_GAP 
		? inputRightValue - RANGE_GAP
		: value
	}

	rangeCalculate(rangeObj){
		const { value, min, max } = rangeObj;
		const percent = ((value - min) / (max - min)) * 100;
		rangeLeft.style.left = `${percent}%`;
		rangeCalc.style.left = `${percent}%`;
	}
}

class RightRange extends Range {
	constructor(element){
		super();
		element.addEventListener('input', this.listener.bind(this));
	}

	listener(e){
		this.value = +e.target.value;
		this.min = +e.target.min
		this.max = +e.target.max
	
		this.value = this.isNotRange(+inputLeft.value, this.value);
		this.rangeCalculate({ 
			value: this.value,
			min: this.min,
			max: this.max
		});
	}

	isNotRange(inputLeftValue, value){
		return value - inputLeftValue < RANGE_GAP 
		? inputLeftValue + RANGE_GAP
		: value
	}

	rangeCalculate(rangeObj){
		const { value, min, max } = rangeObj;
		const percent = ((value - min) / (max - min)) * 100;
		rangeRight.style.right = `${100 - percent}%`;
		rangeCalc.style.right = `${100 - percent}%`;
	}
}


const leftRange = new LeftRange(inputLeft);
const rightRange = new RightRange(inputRight);
