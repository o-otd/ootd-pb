export default function closest(target, className){
	let currentTarget = target;

	while(!currentTarget.classList.contains(className)){
		currentTarget = currentTarget.parentNode
		if(currentTarget.nodeName === 'BODY'){
			currentTarget = null;
			return;
		}
	}

	return currentTarget
}