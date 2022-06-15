{
	function baseCharge(usage) {
		if (usage < 0) return usd(0)
		const amount =
			bottomBand(usage) * 0.03 +
			middleBand(usage) * 0.05 +
			topBand(usage) * 0.07
		return usd(amount)
	}
	function bottomBand(usage) {
		return Math.min(usage, 100)
	}
	function middleBand(usage) {
		return usage > 100 ? Math.min(usage, 200) - 100 : 0
	}
	function topBand(usage) {
		return usage > 200 ? usage - 200 : 0
	}
}
// todo 1. 비슷한 함수 중 하나 선택
// todo 2. 리터럴을 매개변수로 추가
// 3. 함수 호출하는곳에 리터럴 값 추가
// 4. 테스트
// 5. 매개변수로 받은 값을 사용하도록 함수 본문 수정. 테스트
// 6. 비슷한 함수를 호출하는곳을 찾아 매개변수화한 함수를 호출하도록 수정. 테스트
{
	function baseCharge(usage) {
		if (usage < 0) return usd(0)
		const amount =
			bottomBand(usage) * 0.03 +
			// todo 호출 함수도 바꾼다.
			withinBand(usage) * 0.05 +
			topBand(usage) * 0.07
		return usd(amount)
	}
	function bottomBand(usage) {
		return Math.min(usage, 100)
	}
	// todo 1. 비슷한 함수 중 중간에 해당하는 하나를 선택, 다른함수를 여기에 맞춘다.
	// function middleBand(usage) {
	// 	return usage > 100 ? Math.min(usage, 200) - 100 : 0
	// }
	function withinBand(usage, bottom, top) {
		return usage > 100 ? Math.min(usage, 200) - 100 : 0
	}
	function topBand(usage) {
		return usage > 200 ? usage - 200 : 0
	}
}
// todo 3. 함수 호출하는곳에 리터럴 값 추가
// todo 4. 테스트
// todo 5. 매개변수로 받은 값을 사용하도록 함수 본문 수정. 테스트
// 6. 비슷한 함수를 호출하는곳을 찾아 매개변수화한 함수를 호출하도록 수정. 테스트
{
	function baseCharge(usage) {
		if (usage < 0) return usd(0)
		const amount =
			bottomBand(usage) * 0.03 +
			// todo 사용인수를 넘긴다.
			withinBand(usage, 100, 200) * 0.05 +
			topBand(usage) * 0.07
		return usd(amount)
	}
	function bottomBand(usage) {
		return Math.min(usage, 100)
	}
	function withinBand(usage, bottom, top) {
		return usage > bottom ? Math.min(usage, top) - bottom : 0
	}
	function topBand(usage) {
		return usage > 200 ? usage - 200 : 0
	}
}
// todo 5. 매개변수로 받은 값을 사용하도록 함수 본문 수정. 테스트
// todo 6. 비슷한 함수를 호출하는곳을 찾아 매개변수화한 함수를 호출하도록 수정. 테스트
{
	function baseCharge(usage) {
		if (usage < 0) return usd(0)
		const amount =
			withinBand(usage, 0, 100) * 0.03 +
			withinBand(usage, 100, 200) * 0.05 +
			withinBand(usage, 200, Infinity) * 0.07
		return usd(amount)
	}
	// function bottomBand(usage) {
	// 	return Math.min(usage, 100)
	// }
	function withinBand(usage, bottom, top) {
		return usage > bottom ? Math.min(usage, top) - bottom : 0
	}
	// function topBand(usage) {
	// 	return usage > 200 ? usage - 200 : 0
	// }
}
