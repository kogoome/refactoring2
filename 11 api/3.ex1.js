{
	// ! isRush 라는 불리언 플래그 인수를 사용하고 있다.
	function deliveryDate(anOrder, isRush) {
		if (isRush) {
			let deliveryTime
			if (['MA', 'CT'].includes(anOrder.deliveryState)) deliveryTime = 1
			else if (['NY', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 2
			else deliveryTime = 3
			return anOrder.placedOn.plusDays(1 + deliveryTime)
		} else {
			let deliveryTime
			if (['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) deliveryTime = 2
			else if (['ME', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 3
			else deliveryTime = 4
			return anOrder.placedOn.plusDays(2 + deliveryTime)
		}
	}
	const rushDeliveryDate = deliveryDate(anOrder, true)
}
// todo 1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수 생성
// todo 2. 원래 함수를 호출하는 코드들을 찾아서 각 리터럴 값에 대응되는 명시적 함수 호출
{
	// function deliveryDate(anOrder, isRush) {
	// 	if (isRush) {
	// 		return rushDeliveryDate(anOrder)
	// 	} else {
	// 		return regularDeliveryDate(anOrder)
	// 	}
	// }
	// todo 1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수 생성
	function rushDeliveryDate(anOrder) {
		let deliveryTime
		if (['MA', 'CT'].includes(anOrder.deliveryState)) deliveryTime = 1
		else if (['NY', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 2
		else deliveryTime = 3
		return anOrder.placedOn.plusDays(1 + deliveryTime)
	}
	function regularDeliveryDate(anOrder) {
		let deliveryTime
		if (['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) deliveryTime = 2
		else if (['ME', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 3
		else deliveryTime = 4
		return anOrder.placedOn.plusDays(2 + deliveryTime)
	}
	// todo 2. 원래 함수를 호출하는 코드들을 찾아서 각 리터럴 값에 대응되는 명시적 함수 호출
	// const rushDeliveryDate = deliveryDate(anOrder, true)
	const rushDeliveryDate = rushDeliveryDate(anOrder)
	const regularDeliveryDate = regularDeliveryDate(anOrder)
}
