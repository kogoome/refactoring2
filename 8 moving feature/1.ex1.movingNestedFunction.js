// ! 중첩 함수를 최상위로 옮기기
function trackSummary(points) {
	const totalTime = calculateTime()
	const totalDistance = calculateDistance()
	const pace = totalTime / 60 / totalDistance
	return {
		time: totalTime,
		distance: totalDistance,
		pace: pace,
	}
	// 중첩함수
	function calculateDistance() {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result
	}
	// 중첩함수
	function distance(p1, p2) {
		// 하버사인공식
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
	// 중첩함수
	function radians(degrees) {
		return (degrees * Math.PI) / 180
	}
	// 중첩함수
	function calculateTime() {}
}
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
		// * 필요 points, distance()
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
		}
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
		// todo distance(), radians() 함수가 calculateDistance()에서만 사용되므로 호출부에 중첩, 테스트
		// 중첩함수
		// * 호출 trackSummary
		function calculateTime() {}
	}
}
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
		// * 필요 points, distance()
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result

			// 중첩 이동
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
// 0. 옮길 중첩함수 찾기
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// todo 2. 함수가 다형 메서드인지 확인
// todo 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
// todo 4. 정적 분석
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
		// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
		// * 필요 points, distance()-ok
		// * 호출 trackSummary()
		function calculateDistance() {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
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
	// 3. 함수를 타깃 컨텍스트로 복사. 임시이름 사용
	// * 필요 points, distance()
	// * 호출 trackSummary()
	// 4. 정적 분석, 필요 매개변수 적용
	function XXcalculateDistance(points) {
		let result = 0
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result

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
// todo 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// todo 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// todo 7. 테스트
// todo 8. 소스 함수를 인라인할지 고민
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
		// * 필요 points, distance()-ok
		// * 호출 trackSummary()
		function calculateDistance() {
			// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾기
			// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정 테스트
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
		// 위임함수 테스트 이상 없을 시 호출 함수 변경, 테스트
		const totalDistance = XXcalculateDistance(points)
		const pace = totalTime / 60 / totalDistance
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// // * 필요 points, distance()-ok
		// // * 호출 trackSummary()
		// function calculateDistance() {
		// 	XXcalculateDistance(points)
		// }
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
		// 8. 함수명 변경, 함수 인라인
		// const totalDistance = totalDistance(points)
		const pace = totalTime / 60 / totalDistance(points)
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		// * 호출 trackSummary
		function calculateTime() {}
	}
	// * 필요 points-ok, distance()-ok
	// * 호출 trackSummary()-ok
	function totalDistance(points) {
		let result = 0()
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result
		// todo 중첩함수 최상위로 옮기기
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
		const pace = totalTime / 60 / totalDistance(points)
		return {
			time: totalTime,
			distance: totalDistance,
			pace: pace,
		}
		function calculateTime() {}
	}
	function totalDistance(points) {
		let result = 0()
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i])
		}
		return result
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
