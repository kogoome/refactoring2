// 1. 코드 이동 목표 위치 찾기. 이동시 수행 간섭이 생기는지 살피고 있다면 포기
// 2. 이동
// 3. 테스트
{
	const pricingPlan = retrievePricingPlan()
	const order = retreiveOrder() // 값을 반환하는 함수는 부수효과가 없게 만드는게 좋다.
	const baseCharge = pricingPlan.base
	let charge
	const chargePerUnit = pricingPlan.unit
	const units = order.units
	let discount

	charge = baseCharge + units * chargePerUnit
	let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0)

	discount = discountableUnits * pricingPlan.discountFactor
	if (order.isRepeat) discount += 20
	charge = charge - discount
	chargeOrder(charge)
}
// 1. 코드 이동 목표 위치 찾기. 이동시 수행 간섭이 생기는지 살피고 있다면 포기
// 2. 이동
// 3. 테스트
{
	const pricingPlan = retrievePricingPlan()
	const baseCharge = pricingPlan.base
	const chargePerUnit = pricingPlan.unit
	const order = retreiveOrder()
	const units = order.units
	let charge
	let discount

	charge = baseCharge + units * chargePerUnit
	let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0)
	discount = discountableUnits * pricingPlan.discountFactor
	if (order.isRepeat) discount += 20
	charge = charge - discount
	chargeOrder(charge)
}

// 선언하고, 할당하는것 위로 빼고 아래로 갈수록 구체화하는 식으로.
