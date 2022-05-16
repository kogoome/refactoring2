/*
1. 데이터 구조 작성, 클래스는 데이터와 동작까지 묶거나, 동작없는 데이터 클래스를 다룸
2. 테스트
3. 함수 선언 바꾸기(6.5) 새 데이터 구조를 매개변수로 추가
4. 테스트 
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정. 각각 테스트
6. 기존 매개변수를 새 데이터 구조의 원소를 사용
7. 기존 매개변수 제거 테스트
*/


// 온도 측정값reading 배열에서 정상 작동 범위를 벗어난 것이 있는지 검사하는 코드를 살펴보자. 온도 측정값을 표현하는 데이터는 다음과 같다.

const station = {
	name: "ZB1",
	readings: [
		{ temp: 47, time: "2016-11-10 09:10" },
		{ temp: 53, time: "2016-11-10 09:20" },
		{ temp: 58, time: "2016-11-10 09:30" },
		{ temp: 53, time: "2016-11-10 09:40" },
		{ temp: 51, time: "2016-11-10 09:50" },
	],
}

// 다음은 정상 범위를 벗어난 측정값을 찾는 함수다.

function readingsOutsideRange(station, min, max) {
	return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 이 함수는 다음과 같이 호출될 수 있다.

alerts = readingsOutsideRange(
	station,
	operatingPlan.temperatureFloor, // 최저 온도
	operatingPlan.temperatureCeiling, // 최고 온도
)

// 호출 코드를 보면 operatingPlan의 데이터 항목 두 개를 쌍으로 가져와서 readingsOutsideRange()로 전달한다. 그리고 operatingPlan은 범위의 시작과 끝 이름을 readingsOutsideRange()와 다르게 표현한다. 이와 같은 범위range 라는 개념은 객체 하나로 묶어 표현하는 게 나은 대표적인 예다.
// 1. 먼저 묶은 데이터를 표현하는 클래스부터 선언하자.

class NumberRange {
	constructor(min, max) {
		this._data = { min: min, max: max }
	}
	get min() {
		return this._data.min
	}
	get max() {
		return this._data.max
	}
}

// 여기서는 기본 자바스크립트 객체가 아닌 클래스로 선언했는데, 이 리팩터링은 새로 생성한 객체로 동작까지 옮기는 더 큰 작업의 첫 단계로 수행될 때가 많기 때문이다. 이 시나리오에는 클래스가 적합하므로 곧바로 클래스를 사용했다. 한편 값 객체로 만들 가능성이 높기 때문에 세터는 만들지 않는다. 내가 이 리팩터링을 할 때는 대부분 값 객체를 만들게 된다.

// 3. 그런 다음 새로 만든 객체를 readingsOutsideRange()의 매개변수로 추가하도록 함수 선언을 바꾼다.

function readingsOutsideRange(station, min, max, range) {
	return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 자바스크립트라면 호출문을 예전 상태로 둬도 되지만, 다른 언어를 사용할 때는 다음과 같이새 매개변수 자리에 널을 적어둔다.

alerts = readingsOutsideRange(
	station,
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
	null,
)

// 4. 아직까지 동작은 하나도 바꾸지 않았으니 테스트는 문제없이 통과할 것이다.
// 5. 이제 온도범위를 객체 형태로 전달하도록 호출문을 하나씩 바꾼다.

const range = new NumberRange(
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
)
alerts = readingsOutsideRange(
	station,
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
	range,
)

// 여기서도 동작은 바뀌지 않았다. 새로 건넨 매개변수를 아직 사용하지 않기 때문이다. 따라서 이번에도 모든 테스트를 무난히 통과한다.

// 6. 이제 기존 매개변수를 사용하는 부분을 변경한다. 최댓값부터 바꿔보자.
function readingsOutsideRange(station, min, max, range) {
	return station.readings.filter(r => r.temp < min || r.temp > range.max)
}
const range = new NumberRange(
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
)
alerts = readingsOutsideRange(
	station,
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
	range,
)
// 여기서 한 번 테스트한 뒤, 다음 매개변수도 제거한다.

function readingsOutsideRange(station, min, range) {
	return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
}

const range = new NumberRange(
	operatingPlan.temperatureFloor,
	operatingPlan.temperatureCeiling,
)
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, range)

// 이상으로 매개변수 객체 만들기가 끝났다.
