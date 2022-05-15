// 내가 자란 영국에서는 일상에서 차가 차지하는 비중이 상당히 큰 나머지, 나는 서민에게 차를 수돗물처럼 제공하는 서비스를 상상하게 됐다. 이런 서비스가 있다면 매달 사용자가 마신차의 양을 측정reading해야 한다.

reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 }

// 코드 곳곳에서 다양한 방식으로 차 소비량을 계산한다고 해보자. 그중 사용자에게 요금을 부과하기 위해 기본요금을 계산하는 코드도 있다.
{
	// 클라이언트 1...
	const aReading = acquireReading()
	const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity
}
// 세금을 부과할 소비량을 계산하는 코드도 필요하다. 모든 시민이 차 세금을 일부 면제받을 수 있도록 정부가 사려깊게 설계하여 이 값은 기본 소비량보다 적다.
{
	// 클라이언트 2...
	const aReading = acquireReading()
	const base = baseRate(aReading.month, aReading.year) * aReading.quantity
	const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))
}

// 이 코드에는 이와 같은 계산 코드가 여러 곳에 반복된다고 해보자. 중복 코드는 나중에 로직을수정할 때 골치를 썩인다 (장담하건대 반드시 수정할 일이 생긴다). 중복 코드라면 함수 추출하기 1걸로 처리할 수도 있지만, 추출한 함수들이 프로그램 곳곳에 흩어져서 나중에 프로그래머가 그런 함수가 있는지조차 모르게 될 가능성이 있다. 실제로도 다른 곳에서 함수로 만들어둔 것을 발견했다.
{
	// 클라이언트 3...
	const aReading = acquireReading()
	const basicChargeAmount = calculateBaseCharge(aReading)
	// 다른 곳에서 이미 함수로 만들어둠
	function calculateBaseCharge(aReading) {
		return baseRate(aReading.month, aReading.year) * aReading.quantity
	}
}

// 이를 해결하는 방법으로, 다양한 파생 정보 계산 로직을 모두 하나의 변환 단계로 모을 수 있다. 변환 단계에서 미가공 측정값을 입력받아서 다양한 가공 정보를 덧붙여 반환하는 것이다.

// 1. 우선 입력 객체를 그대로 복사해 반환하는 변환 함수를 만든다.

function enrichReading(original) {
	const result = _.cloneDeep(original)
	return result
}

// 깊은 복사는 lodash 라이브러리가 제공하는 cloneDeep()로 처리했다.
// 참고로 나는 본질은 같고 부가 정보만 덧붙이는 변환 함수의 이름을 "enrich" 라 하고, 형태가 변할 때만 "transform"이라는 이름을 쓴다.

// 2. 이제 변경하려는 계산 로직 중 하나를 고른다. 먼저 이 계산 로직에 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다.
{
	// 클라이언트 3...
	const rawReading = acquireReading() // 미가공 측정값
	const aReading = enrichReading(rawReading)
	const basicChargeAmount = calculateBaseCharge(aReading)
}
// calculateBaseCharge()를 부가 정보를 덧붙이는 코드 근처로 옮긴다 (함수 옮기기(6.1)).

function enrichReading(original) {
	const result = _.cloneDeep(original)
	result.baseCharge = calculateBaseCharge(result)
	return result
} // 미가공 측정값에 기본 소비량을 부가 정보로 덧붙임

// 변환 함수 안에서는 결과 객체를 매번 복제할 필요 없이 마음껏 변경해도 된다. 나는 불변 데이터를 선호하지만 널리 사용되는 언어는 대부분 불변 데이터를 다루기 어렵게 돼 있다. 데이터가 모듈 경계를 넘나든다면 어려움을 기꺼이 감내하며 불변으로 만들어 사용하겠지만, 데이터의 유효범위가 좁을 때는 마음껏 변경한다. 또한 나는 변환 함수로 옮기기 쉬운 이름을 붙인다(여기서는 보강된 값을 담는 변수의 이름을 aReading이라고 지었다).

// 이어서 이 함수를 사용하던 클라이언트가 부가 정보를 담은 필드를 사용하도록 수정한다.
{
	// 클라이언트 3..
	const rawReading = acquireReading()
	const aReading = enrichReading(rawReading)
	const basicChargeAmount = aReading.baseCharge
}
// calculateBaseCharge()를 호출하는 코드를 모두 수정했다면, 이 함수를 enrichReading()안에 중첩시킬 수 있다. 그러면 기본요금을 이용하는 클라이언트는 변환된 레코드를 사용해야 한다'는 의도를 명확히 표현할 수 있다.

// 여기서 주의할 점이 있다. enrichReading() 처럼 정보를 추가해 반환할 때 원본 측정값 레코드는 변경하지 않아야 한다는 것이다. 따라서 이를 확인하는 테스트를 작성해두는 것이 좋다.

it("check reading unchanged", function () {
	const baseReading = { customer: "ivan", quantity: 15, month: 5, year: 2017 }
	const oracle = _.cloneDeep(baseReading)
	enrichReading(baseReading)
	assert.deepEqual(baseReading, oracle)
})

// 그런 다음 클라이언트 1도 이 필드를 사용하도록 수정한다.
{
	// 클라이언트 1...
	const rawReading = acquireReading()
	const aReading = enrichReading(rawReading)
	const baseCharge = aReading.baseCharge
}
// 이때 baseCharge 변수도 인라인(6.4)하면 좋다.

// 4. 이제 세금을 부과할 소비량 계산으로 넘어가자. 가장 먼저 변환 함수부터 끼워 넣는다.

const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const base = baseRate(aReading.month, aReading.year) * aReading.quantity
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))

// 여기서 기본요금을 계산하는 부분을 앞에서 새로 만든 필드로 교체할 수 있다. 계산이 복잡하다면 함수 추출하기 1절부터 하겠으나, 여기서는 복잡하지 않으니 한 번에 처리하겠다.
{
	const rawReading = acquireReading()
	const aReading = enrichReading(rawReading)
	const base = aReading.baseCharge
	const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))
}
// 테스트해서 문제가 없다면 base 변수를 인라인 4정한다.
{
	const rawReading = acquireReading()
	const aReading = enrichReading(rawReading)
	const taxableCharge = Math.max(
		0,
		aReading.baseCharge - taxThreshold(aReading.year),
	)
}
// 그런 다음 계산 코드를 변환 함수로 옮긴다.

function enrichReading(original) {
	const result = _.cloneDeep(original)
	result.baseCharge = calculateBaseCharge(result)
	result.taxableCharge = Math.max(
		0,
		result.baseCharge - taxThreshold(result.year),
	)
	return result
}
// 이제 새로 만든 필드를 사용하도록 원본 코드를 수정한다.
{
	const rawReading = acquireReading()
	const aReading = enrichReading(rawReading)
	const taxableCharge = aReading.taxableCharge // 테스트에 성공하면 taxableCharge 변수를 인라인(6.4)한다.
}

// 측정값에 부가 정보를 추가하는 지금 방식에서 클라이언트가 데이터를 변경하면 심각한 문제가 생길수 있다. 예컨대 사용량 필드를 변경하면 데이터의 일관성이 깨진다. 내 생각에 자바스크립트에서 이문제를 방지하기 가장 좋은 방법은 여러 함수를 클래스로 묶기다. 불변 데이터 구조를 지원하는 언어라면 이런 문제가 생길 일이 없다. 따라서 이런 언어로 프로그래밍할 때는 (그렇지 않은 언어를 쓸때보다) 여러 함수를 변환 함수로 묶기를 사용하는 비중이 높아진다. 하지만 불변성을 제공하지않는 언어라도, 웹 페이지에 출력할 부가 데이터를 도출할 때처럼 데이터가 읽기전용 문맥에서 사용될 때는 변환 방식을 활용할 수 있다.
