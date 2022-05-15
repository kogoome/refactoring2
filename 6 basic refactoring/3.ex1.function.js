// * 함수에서 변수 추출하기

function price(order) {
	// 가격(price). = 기본 가격 - 수량 할인 + 배송비
	return (
		order.quantity * order.itemPrice -
			Math.max(0, order.quantity - 500) * order,
		itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

// 간단한 코드지만 더 쉽게 만들 수 있다. 먼저 기본 가격은 상품 가격 (itemPrice)에 수량(quantity)을 곱한 값임을 파악해내야 한다.

function price(order) {
	// 가격(price) - 기본 가격 - 수량 할인 + 배송비
	return (
		order.quantity * order.itemPrice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

// 절차(2)가 이 로직을 이해했다면 기본 가격을 담을 변수를 만들고 적절한 이름을 지어준다.

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	return (
		order.quantity * order.itemPrice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

// 물론 이렇게 변수 하나를 선언하고 초기화한다고 해서 달라지는 건 없다. 절차(3) 이 변수를 실제로사용해야 하므로 원래 표현식에서 새로 만든 변수에 해당하는 부분을 교체한다.

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	return (
		basePrice -
		Math.max(0, order, quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

// 방금 교체한 표현식이 쓰이는 부분이 더 있다면 마찬가지로 새 변수를 사용하도록 수정한다.

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	return (
		basePrice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(basePrice * 0.1, 100)
	)
}

// 절차(5) 그다음 줄은 수량 할인이다. 수량 할인도 다음과 같이 추출하고 교체한다.

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	const quantityDiscount =
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
	return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100)
}

// 마지막으로 배송비도 똑같이 처리한다. 다 수정했다면 주석은 지워도 된다. 주석에서 한 말이 코드에 그대로 드러나기 때문이다.

function price(order) {
	const basePrice = order.quantity * order.itemPrice
	const quantityDiscount =
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.5
	const shipping = Math.min(basePrice * 0.1, 100)
	return basePrice - quantityDiscount + shipping
}
