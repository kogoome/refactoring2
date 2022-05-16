/*
	! 함수에서 변수 추출하기
	절차
	1. 표현식 부작용 파악
	2. 불변 변수 선언, 추출 표현식의 복제본 대입
	3. 원본 표현식을 새로 만든 변수로 교체
	4. 테스트
	5. 표현식 사용처가 많을시 각각 교체. 교체시마다 테스트
*/

function price(order) {
	// * 1. 부작용파악 : 로직의 구조가 직관적이지 않음
	// 구조 : 가격(price) = 기본가격 - 수량할인 + 배송비
	return (
		order.quantity * order.itemPrice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

function price(order) {
	// 구조 : 가격(price) = 기본가격 - 수량할인 + 배송비
	// * 2. 로직의 구조에 맞는 변수명을 작성
	const basePrice = order.quantity * order.itemPrice // * 기본가격
	return (
		order.quantity * order.itemPrice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100)
	)
}

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	return (
		basePrice - // * 3. 원본 표현식을 새로 만든 변수로 교체
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(basePrice * 0.1, 100)
		// * 5. 다른곳에 있는 같은로직에도 변수 적용
	)
}

function price(order) {
	// 가격(price) = 기본 가격 - 수량 할인 + 배송비
	const basePrice = order.quantity * order.itemPrice
	// * 수량할인 변수 생성
	const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
	return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100) 
	// * 수량할인 변수 적용
}

function price(order) {
	const basePrice = order.quantity * order.itemPrice
	const quantityDiscount =
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.5
	// * 배송비 변수 생성
	const shipping = Math.min(basePrice * 0.1, 100)
	return basePrice - quantityDiscount + shipping // * 배송비 변수 적용
	// * 구조 반영 : 가격(price) = 기본 가격 - 수량 할인 + 배송비
}
