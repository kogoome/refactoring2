// * 진정한 값 객체로 거듭나기
// 이전 코드에서 온도가 허용범위 이탈하는지 테스트하는 함수가 외부에 있는데, 이를 데이터 클래스에 넣는다.

// 기존데이터
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
	// 기존코드
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
		// * 기준온도 이탈 리턴함수
		contains(arg) {
			return arg >= this.min && arg <= this.max
		}
	}

	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }

	const range = new NumberRange(
		operatingPlan.temperatureFloor,
		operatingPlan.temperatureCeiling,
	)

	// function readingsOutsideRange(station, range) {
	// 	return station.readings.filter(
	// 		r => r.temp < range.min || r.temp > range.max,
	// 	)
	// } // * 함수에서 온도이탈 로직을 클래스의 메서드로 대체
	function readingsOutsideRange(station, range) {
		return station.readings.filter(r => !range.contains(r.temp))
	}

	alerts = readingsOutsideRange(station, range)

	console.log(alerts)
}

// 지금까지 한 작업은 여러 가지 유용한 동작을 갖춘 범위(Range) 클래스*를 생성하기 위한 첫 단계다. 코드에 범위 개념이 필요함을 깨달았다면 최댓값과 최솟값 쌍을 사용하는 코드를 발견할 때마다 범위 객체로 바꾸자(당장 operatingPlan의 temperatureFloor와 temperatureCeiling을 temperatureRange로 교체할 수 있다), 이러한 값 쌍이 어떻게 사용되는지 살펴보면 다른 유용한 동작도 범위 클래스로 옮겨서 코드베이스 전반에서 값을 활용하는 방식을 간소화할 수 있다. 나라면 진정한 값 객체로 만들기 위해 값에 기반한 동치성 검사 메서드equality method부터 추가할 것이다.
