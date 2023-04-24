function colorExtraction(){
	let result = [];
	const colorNameElement = [...document.querySelectorAll('.color-name')];
	colorNameElement.forEach(colorElem => result.push(colorElem.textContent));
	return result;
}

function colorDefine(){
	const colorShapeElement = [...document.querySelectorAll('.color-shape')];
	const colorNames = colorExtraction();
	for(let i = 0; i < colorNames.length; i++){
		colorShapeElement[i].style.backgroundColor = colorNames[i];
	}
}

colorDefine();