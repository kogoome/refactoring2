// 실내온도 모니터링 시스템
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}

		withinRange(bottom, top) {
			return (
				bottom >= this._temperatureRange.low &&
				top <= this._temperatureRange.high
			)
		}
		get daysTempRange() {
			return this._temperatureRange
		}
	}

	// 호출자
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	if (!aPlan.withinRange(low, high))
		alerts.push('room temperature went outside range')
}
// todo 1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다
// todo 2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다
// todo 3. 정적검사를 수행한다.
// 4. 모든 호출자가 새 함수를 사용하게 수정한다.
// 5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
// 6. 새함수의 이름을 적적히 수정하고 모든 호출자에 반영한다.
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}
		withinRange(bottom, top) {
			return (
				bottom >= this._temperatureRange.low &&
				top <= this._temperatureRange.high
			)
		}
		// todo 각 온도를 범위객체 통째로 넘길 수 있다.
		xxNEWwithinRange(aNumberRange) {
			return this.withinRange(aNumberRange.low, aNumberRange.high)
		}
		get daysTempRange() {
			return this._temperatureRange
		}
	}

	// 호출자
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	if (!aPlan.withinRange(low, high))
		alerts.push('room temperature went outside range')
}
// todo 4. 모든 호출자가 새 함수를 사용하게 수정한다.
// 5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
// 6. 새함수의 이름을 적적히 수정하고 모든 호출자에 반영한다.
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}
		withinRange(bottom, top) {
			return (
				bottom >= this._temperatureRange.low &&
				top <= this._temperatureRange.high
			)
		}
		// todo 각 온도를 범위객체 통째로 넘길 수 있다.
		xxNEWwithinRange(aNumberRange) {
			return this.withinRange(aNumberRange.low, aNumberRange.high)
		}
		get daysTempRange() {
			return this._temperatureRange
		}
	}

	// 호출자
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	// todo 4. 모든 호출자가 새 함수를 사용하게 수정한다.
	if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
		alerts.push('room temperature went outside range')
}
// todo 5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
// 6. 새함수의 이름을 적적히 수정하고 모든 호출자에 반영한다.
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}
		// withinRange(bottom, top) {
		// 	return (
		// 		bottom >= this._temperatureRange.low &&
		// 		top <= this._temperatureRange.high
		// 	)
		// }
		// todo 5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
		xxNEWwithinRange(aNumberRange) {
			return (
				aNumberRange.low >= this._temperatureRange.low &&
				aNumberRange.high <= this._temperatureRange.high
			)
		}
		get daysTempRange() {
			return this._temperatureRange
		}
	}

	// 호출자
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
		alerts.push('room temperature went outside range')
}
// todo 6. 새함수의 이름을 적적히 수정하고 모든 호출자에 반영한다.
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}
		withinRange(aNumberRange) {
			return (
				aNumberRange.low >= this._temperatureRange.low &&
				aNumberRange.high <= this._temperatureRange.high
			)
		}
		get daysTempRange() {
			return this._temperatureRange
		}
	}

	// 호출자
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	if (!aPlan.withinRange(aRoom.daysTempRange))
		alerts.push('room temperature went outside range')
}
