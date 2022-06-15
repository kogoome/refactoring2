// ! 코드작성 없이 다른 리팩터링을 연달아 수행하여 새 메서드를 만들어내는 방법
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
{
	class HeatingPlan {
		//...
	}

	// 호출자
	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	const low = aRoom.daysTempRange.low
	const high = aRoom.daysTempRange.high
	// todo 변수 추출
	const isWithinRange = aPlan.withinRange(low, high)
	// todo 변수 적용
	if (!isWithinRange) alerts.push('room temperature went outside range')
}
{
	class HeatingPlan {
		//...
	}

	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	// todo 입력매개변수 추출
	const tempRange = aRoom.daysTempRange
	const low = tempRange.low
	const high = tempRange.high
	const isWithinRange = aPlan.withinRange(low, high)
	if (!isWithinRange) alerts.push('room temperature went outside range')
}
{
	class HeatingPlan {
		//...
	}

	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	const tempRange = aRoom.daysTempRange
	// todo 함수로 변형
	const low = tempRange.low
	const high = tempRange.high
	const isWithinRange = aPlan.withinRange(low, high)

	if (!isWithinRange) alerts.push('room temperature went outside range')
	// todo 함수 추출하기
	function xxNEWwithinRange(aPlan, tempRange) {
		const low = tempRange.low
		const high = tempRange.high
		const isWithinRange = aPlan.withinRange(low, high)
		return isWithinRange
	}
}
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
		xxNEWwithinRange(tempRange) {
			const low = tempRange.low
			const high = tempRange.high
			const isWithinRange = this.withinRange(low, high)
			return isWithinRange
		}
	}

	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	const tempRange = aRoom.daysTempRange
	const isWithinRange = xxNEWwithinRange(aPlan, tempRange)

	if (!isWithinRange) alerts.push('room temperature went outside range')
	// todo 함수 옮기기
	// function xxNEWwithinRange(aPlan, tempRange) {
	// 	const low = tempRange.low
	// 	const high = tempRange.high
	// 	const isWithinRange = aPlan.withinRange(low, high)
	// 	return isWithinRange
	// }
}
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
		get daysTempRange() {
			return this._temperatureRange
		}
		// todo 함수 인라인하기
		xxNEWwithinRange(tempRange) {
			const low = tempRange.low
			const high = tempRange.high
			const isWithinRange =
				low >= this._temperatureRange.low && high <= this._temperatureRange.high
			return isWithinRange
		}
	}

	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	const tempRange = aRoom.daysTempRange
	const isWithinRange = xxNEWwithinRange(aPlan, tempRange)

	if (!isWithinRange) alerts.push('room temperature went outside range')
}
{
	class HeatingPlan {
		constructor(low, high) {
			this._temperatureRange.low = low
			this._temperatureRange.high = high
		}
		get daysTempRange() {
			return this._temperatureRange
		}
		// todo 함수 선언 변경
		withinRange(tempRange) {
			const low = tempRange.low
			const high = tempRange.high
			const isWithinRange =
				low >= this._temperatureRange.low && high <= this._temperatureRange.high
			return isWithinRange
		}
	}

	const aPlan = new HeatingPlan(21, 24)
	const aRoom = new HeatingPlan(20, 25)
	const tempRange = aRoom.daysTempRange
	const isWithinRange = withinRange(aPlan, tempRange)

	if (!isWithinRange) alerts.push('room temperature went outside range')
}
