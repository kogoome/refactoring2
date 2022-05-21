// ! 중첩 함수를 최상위로 옮기기

// todo 0. 옮길 중첩함수 찾기
// todo 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// 8. 소스 함수를 인라인할지 고민
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		const totalDistance = calculateDistance()
		const pace = totalTime / 60 / totalDistance
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// 중첩함수들-ok
		// * 필요 points, distance()
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
		}
		// 중첩함수들-ok
		// * 필요 radians()
		// * 호출 calculateDistance()
		function distance(p1, p2) {
			const EARTH_RADIUS = 3959
			const dLat = radians(p2.lat) - radians(p1.lat)
			const dLon = radians(p2.lon) - radians(p1.lon)
			const a =
				Math.pow(Math.sin(dLat / 2), 2) +
				Math.cos(radians(p2.lat)) *
					Math.cos(radians(p1.lat)) *
					Math.pow(Math.sin(dLon / 2), 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			return EARTH_RADIUS * c
		}
		// 중첩함수들-ok
		// * 호출 distance()
		function radians(degrees) {
			return (degrees * Math.PI) / 180
		}
		// todo distance(), radians() 함수가 calculateDistance()에서만 사용되므로 호출부에 중첩, 테스트
		// 중첩함수들-ok
		// * 호출 trackSummary
		function calculateTime() {}
	}
}
// 0. 옮길 중첩함수 찾기
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// todo 2. 함수가 다형 메서드인지 확인
// todo 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
// todo 4. 정적 분석
// todo 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// 8. 소스 함수를 인라인할지 고민
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		const totalDistance = calculateDistance()
		const pace = totalTime / 60 / totalDistance
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// todo 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
		// * 필요 points, distance()-ok
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result

			// distance(), radians() 함수가 calculateDistance()에서만 사용되므로 호출부에 중첩-ok, 테스트-ok
			// * 필요 radians()
			// * 호출 calculateDistance()
			function distance(p1, p2) {
				const EARTH_RADIUS = 3959
				const dLat = radians(p2.lat) - radians(p1.lat)
				const dLon = radians(p2.lon) - radians(p1.lon)
				const a =
					Math.pow(Math.sin(dLat / 2), 2) +
					Math.cos(radians(p2.lat)) *
						Math.cos(radians(p1.lat)) *
						Math.pow(Math.sin(dLon / 2), 2)
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
				return EARTH_RADIUS * c
			}
			// * 호출 distance()
			function radians(degrees) {
				return (degrees * Math.PI) / 180
			}
		}

		// * 호출 trackSummary
		function calculateTime() {}
	}
}
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		// todo 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영, 테스트
		const totalDistance = calculateDistance()
		const pace = totalTime / 60 / totalDistance
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용-ok
		// * 필요 points, distance()-ok
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result

			// distance(), radians() 함수가 calculateDistance()에서만 사용되므로 호출부에 중첩-ok, 테스트-ok
			// * 필요 radians()
			// * 호출 calculateDistance()
			function distance(p1, p2) {
				const EARTH_RADIUS = 3959
				const dLat = radians(p2.lat) - radians(p1.lat)
				const dLon = radians(p2.lon) - radians(p1.lon)
				const a =
					Math.pow(Math.sin(dLat / 2), 2) +
					Math.cos(radians(p2.lat)) *
						Math.cos(radians(p1.lat)) *
						Math.pow(Math.sin(dLon / 2), 2)
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
				return EARTH_RADIUS * c
			}
			// * 호출 distance()
			function radians(degrees) {
				return (degrees * Math.PI) / 180
			}
		}

		// * 호출 trackSummary
		function calculateTime() {}
	}
	// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용-ok
	// * 필요 points, distance()-ok
	// todo 필요변수 매개변수 처리-ok
	// * 호출 trackSummary()
	function XXcalculateDistance(points) {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result

		// distance(), radians() 함수가 calculateDistance()에서만 사용되므로 호출부에 중첩-ok, 테스트-ok
		// * 필요 radians()
		// * 호출 calculateDistance()
		function distance(p1, p2) {
			const EARTH_RADIUS = 3959
			const dLat = radians(p2.lat) - radians(p1.lat)
			const dLon = radians(p2.lon) - radians(p1.lon)
			const a =
				Math.pow(Math.sin(dLat / 2), 2) +
				Math.cos(radians(p2.lat)) *
					Math.cos(radians(p1.lat)) *
					Math.pow(Math.sin(dLon / 2), 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			return EARTH_RADIUS * c
		}
		// * 호출 distance()
		function radians(degrees) {
			return (degrees * Math.PI) / 180
		}
	}
}
// 0. 옮길 중첩함수 찾기
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// todo 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// todo 7. 테스트
// todo 8. 소스 함수를 인라인할지 고민
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영-ok, 테스트-ok
		// todo 8. 소스 함수를 인라인할지 고민
		const totalDistance = XXcalculateDistance()
		const pace = totalTime / 60 / totalDistance
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// * 필요 points, distance()-ok
		// * 호출 trackSummary()
		// 호출부에 임시사용 안할시 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정 테스트
		function calculateDistance() {
			XXcalculateDistance(points)
		}
		// * 호출 trackSummary
		function calculateTime() {}
	}
	// * 필요 points-ok, distance()-ok
	// * 호출 trackSummary()-ok
	function XXcalculateDistance(points) {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result

		// * 필요 radians()-ok
		// * 호출 calculateDistance()-ok
		function distance(p1, p2) {
			const EARTH_RADIUS = 3959
			const dLat = radians(p2.lat) - radians(p1.lat)
			const dLon = radians(p2.lon) - radians(p1.lon)
			const a =
				Math.pow(Math.sin(dLat / 2), 2) +
				Math.cos(radians(p2.lat)) *
					Math.cos(radians(p1.lat)) *
					Math.pow(Math.sin(dLon / 2), 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			return EARTH_RADIUS * c
		}
		// * 호출 distance()-ok
		function radians(degrees) {
			return (degrees * Math.PI) / 180
		}
	}
}
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		// 8. 소스 함수를 인라인-ok
		const pace = totalTime / 60 / tXXcalculateDistance()
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		function calculateDistance() {
			XXcalculateDistance(points)
		}
		function calculateTime() {}
	}
	function XXcalculateDistance(points) {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result
		// todo 이 중첩함수도 외부로 이동, 테스트
		function distance(p1, p2) {
			const EARTH_RADIUS = 3959
			const dLat = radians(p2.lat) - radians(p1.lat)
			const dLon = radians(p2.lon) - radians(p1.lon)
			const a =
				Math.pow(Math.sin(dLat / 2), 2) +
				Math.cos(radians(p2.lat)) *
					Math.cos(radians(p1.lat)) *
					Math.pow(Math.sin(dLon / 2), 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			return EARTH_RADIUS * c
		}
		function radians(degrees) {
			return (degrees * Math.PI) / 180
		}
	}
}
{
	function trackSummary(points) {
		const totalTime = calculateTime()
		const pace = totalTime / 60 / tXXcalculateDistance()
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		function calculateDistance() {
			XXcalculateDistance(points)
		}
		function calculateTime() {}
	}
	function XXcalculateDistance(points) {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result
		// 이 중첩함수도 외부로 이동-ok, 테스트-ok
	}
	function distance(p1, p2) {
		const EARTH_RADIUS = 3959
		const dLat = radians(p2.lat) - radians(p1.lat)
		const dLon = radians(p2.lon) - radians(p1.lon)
		const a =
			Math.pow(Math.sin(dLat / 2), 2) +
			Math.cos(radians(p2.lat)) *
				Math.cos(radians(p1.lat)) *
				Math.pow(Math.sin(dLon / 2), 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		return EARTH_RADIUS * c
	}
	function radians(degrees) {
		return (degrees * Math.PI) / 180
	}
}
