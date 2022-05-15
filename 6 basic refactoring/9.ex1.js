// 나는 차를 사랑하기로 소문난 영국에서 자랐다 (개인적으로 영국에서 파는 차는 대부분 좋아하지 않지만 중국이나 일본 차는 좋아한다). 그래서 작가다운 상상력을 발휘하여 정부에서 차를 수돗물처럼 제공하는 예를 떠올려봤다. 사람들은 매달 차 계량기를 읽어서 측정값reading을 다음과 같이 기록한다고 하자.

reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 }

// 이런 레코드를 처리하는 코드를 훑어보니 이 데이터로 비슷한 연산을 수행하는 부분이 상당히 많았다. 그래서 기본요금을 계산하는 코드를 찾아봤다.
{
	// 클라이언트 1...
	const aReading = acquireReading()
	const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity
}
// 필수품이라면 죄다 세금을 매기는 영국을 배경으로 하는 만큼 차에도 세금을 부과한다. 하지만기본적인 차 소비량만큼은 면세가 되도록 했다.
{
	// 클라이언트 2...
	const aReading = acquireReading()
	const base = baseRate(aReading.month, aReading.year) * aReading.quantity
	const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))
}
// 여기서도 기본요금 계산 공식이 똑같이 등장하는 것을 발견했다. 나와 성향이 같다면 곧바로함수로 추출하려 시도할 것이다. 그런데 마침 이미 이렇게 처리해둔 코드를 발견했다.
{
	// - 클라이언트 3...
	const aReading = acquireReading()
	const basicChargeAmount = calculateBaseCharge(aReading)
	// 기본 요금 계산 함수
	function calculateBaseCharge(aReading) {
		return baseRate(aReading.month, aReading.year) * aReading.quantity
	}
}
// 이런 코드를 보면 나는 본능적으로 앞의 두 클라이언트 (클라이언트 1, 2)도 이 함수를 사용하도록 고치려고 한다. 하지만 이렇게 최상위 함수로 두면 못 보고 지나치기 쉽다는 문제가 있다.나라면 이런 함수를 데이터 처리 코드 가까이에 둔다. 그러기 위한 좋은 방법으로, 데이터를 클래스로 만들 수 있다.

// 1. 먼저 레코드를 클래스로 변환하기 위해 레코드를 캡슐화(7.1)한다.

class Reading {
	constructor(data) {
		this._customer = data.customer
		this._quantity = data.quantity
		this._month = data.month
		this.year = data.year
	}
	get customer() {
		return this._customer
	}
	get quantity() {
		return this._quantity
	}
	get month() {
		return this._month
	}
	get year() {
		return this._year
	}
}

// ② 이미 만들어져 있는 calculateBaseCharge()부터 옮기자. 새 클래스를 사용하려면 데이터를 얻자마자 객체로 만들어야 한다.
{
	// 클라이언트 3...
	const rawReading = acquireReading()
	const aReading = new Reading(rawReading)
	const basicChargeAmount = calculateBaseCharge(aReading)
}
// 그런 다음 calculateBaseCharge()를 새로 만든 클래스로 옮긴다(함수 옮기기(6.1)).
class Reading {
	get calculateBaseCharge() {
		return baseRate(this.month, this.year) * this.quantity
	}
}
{
	// 클라이언트 3....
	const rawReading = acquireReading()
	const aReading = new Reading(rawReading)
	const basicChargeAmount = aReading.calculateBaseCharge
}
{
	// 이 과정에서 메서드 이름을 원하는대로 바꾼다(함수 이름 바꾸기(6-5)).
	class what {
		get baseCharge() {
			return baseRate(this.month, this.year) * this.quantity
		}
	}
}
{
	// 클라이언트 3...
	const rawReading = acquireReading()
	const aReading = new Reading(rawReading)
	const basicChargeAmount = aReading.baseCharge
}

// 이렇게 이름을 바꾸고 나면 Reading 클래스의 클라이언트는 baseCharge가 필드인지, 계산된값(함수 호출)인지 구분할 수 없다. 이는 단일 접근 원칙' inform Access Principle* 을 따르므로 권장하는 방식이다.

// 이제 첫 번째 클라이언트에서 중복된 계산 코드를 고쳐 앞의 메서드를 호출하게 한다.
{
	// 클라이언트 1...
	const rawReading = acquireReading()
	const aReading = new Reading(rawReading)
	const baseCharge = aReading.baseCharge
}
// 나는 이런 코드를 보면 baseCharge 변수를 인라인 4절하고 싶어진다. 하지만 이보다는 세금을 계산하는 클라이언트부터 인라인하는 일이 절실하다. 그래서 우선 새로 만든 기본요금 메서드를 사용하도록 수정한다.
{
	// 클라이언트 2...
	const rawReading = acquireReading()
	const aReading = new Reading(rawReading)
	const taxableCharge = Math.max(
		0,
		aReading.baseCharge - taxThreshold(aReading.year),
	)
}
// 이어서 세금을 부과할 소비량을 계산하는 코드를 함수로 추출이 전한다.
function taxableChargeFn(aReading) {
	return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year))
}

// - 클라이언트 3...
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
const taxableCharge = taxableChargeFn(aReading)

// 그런 다음 방금 추출한 함수를 Reading 클래스로 옮긴다(함수 옮기기(8.1)).

class Reading {
	get taxableCharge() {
		return Math.max(0, this.baseCharge - taxThreshold(this.year))
	}
}

{
// 클라이언트 3... 
const rawReading = acquireReading(); 
const aReading = new Reading(rawReading); 
const taxableCharge = aReading.taxableCharge;
}

// 파생 데이터 모두를 필요한 시점에 계산되게 만들었으니 저장된 데이터를 갱신하더라도 문제제가 생길 일이 없다. 나는 대체로 불변 데이터를 선호하지만 어쩔 수 없이 가변 데이터를 사용해야 할 때가 많다(가령 자바스크립트처럼 불변성을 염두에 두지 않고 설계된 언어라면 더욱 그렇다). 프로그램의 다른 부분에서 데이터를 갱신할 가능성이 꽤 있을 때는 클래스로 묶어두면큰 도움이 된다.
