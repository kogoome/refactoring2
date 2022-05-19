/*
1. 데이터 구조 작성, 클래스는 데이터와 동작까지 묶거나, 동작없는 데이터 클래스를 다룸
2. 테스트
3. 함수 선언 바꾸기(6.5) 새 데이터 구조를 매개변수로 추가
4. 테스트 
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정. 각각 테스트
6. 기존 매개변수를 새 데이터 구조의 원소를 사용
7. 기존 매개변수 제거 테스트
*/

// 리팩터링 코드
// 측정 온도 데이터
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
{
	// 기준온도 이탈 필터링 함수,
	function readingsOutsideRange(station, min, max) {
		return station.readings.filter(r => r.temp < min || r.temp > max)
	}
	// 이탈 기준온도
	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }
	// 필터링된 이탈 데이터들
	const alerts = readingsOutsideRange(
		station,
		operatingPlan.temperatureFloor, // 최저 온도
		operatingPlan.temperatureCeiling, // 최고 온도
	)
	console.log(alerts)
	// [
	// 	{ temp: 47, time: '2016-11-10 09:10' },
	// 	{ temp: 58, time: '2016-11-10 09:30' }
	// ]
	// * operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling
	// range 객체를 새로 만들고 옮겨 매개변수의 사용을 줄이도록하자.
}
{
	// * 1. 데이터 클래스 선언
	class NumberRange {
		#data
		constructor(min, max) {
			this.#data = { min: min, max: max }
		}
		get min() {
			return this.#data.min
		}
		get max() {
			return this.#data.max
		}
	}

	// * 3. 함수에 매개변수 추가
	function readingsOutsideRange(station, min, max, range) {
		return station.readings.filter(r => r.temp < min || r.temp > max)
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	// * 3. 실행부 range 자리에 null 추가
	alerts = readingsOutsideRange(
		station,
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
		null,
	)

	console.log(alerts)
	// * 테스트 : 동작수정 없으므로 통과
	// [
	// 	{ temp: 47, time: '2016-11-10 09:10' },
	// 	{ temp: 58, time: '2016-11-10 09:30' }
	// ]
}
{
	class NumberRange {
		#data
		constructor(min, max) {
			this.#data = { min: min, max: max }
		}
		get min() {
			return this.#data.min
		}
		get max() {
			return this.#data.max
		}
	}

	function readingsOutsideRange(station, min, max, range) {
		return station.readings.filter(r => r.temp < min || r.temp > max)
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	// * 5. range 작성, 기존 온도정보를 새로운 데이터 구조로 이동
	const range = new NumberRange(
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
	)
	// * 5. 실행부 null -> range 변경
	alerts = readingsOutsideRange(
		station,
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
		range,
	)
	// * 5. 테스트 통과
	console.log(alerts)
}
{
	class NumberRange {
		#data
		constructor(min, max) {
			this.#data = { min: min, max: max }
		}
		get min() {
			return this.#data.min
		}
		get max() {
			return this.#data.max
		}
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	const range = new NumberRange(
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
	)

	// * 6. range 사용. 최댓값부터.
	function readingsOutsideRange(station, min, max, range) {
		return station.readings.filter(r => r.temp < min || r.temp > range.max)
	}

	alerts = readingsOutsideRange(
		station,
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
		range,
	)
	console.log(alerts) // * 테스트 통과
}
{
	class NumberRange {
		#data
		constructor(min, max) {
			this.#data = { min: min, max: max }
		}
		get min() {
			return this.#data.min
		}
		get max() {
			return this.#data.max
		}
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	const range = new NumberRange(
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
	)

	// * 7. 기존 매개변수 삭제, 다음 매개변수도 똑같이 적용
	function readingsOutsideRange(station, min, range) {
		return station.readings.filter(
			r => r.temp < range.min || r.temp > range.max,
		)
	}
	// * 7. 실행부 max값 삭제
	alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, range)
	console.log(alerts) // * 테스트 통과
}
{
	class NumberRange {
		#data
		constructor(min, max) {
			this.#data = { min: min, max: max }
		}
		get min() {
			return this.#data.min
		}
		get max() {
			return this.#data.max
		}
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	const range = new NumberRange(
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
	)

	// * 7. 반복. 기존 매개변수 삭제,
	function readingsOutsideRange(station, range) {
		return station.readings.filter(
			r => r.temp < range.min || r.temp > range.max,
		)
	}
	// * 7. 실행부 min값 삭제
	alerts = readingsOutsideRange(station, range)
	console.log(alerts) // * 테스트 통과
}
