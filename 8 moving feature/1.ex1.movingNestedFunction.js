// 중첩 함수를 최상위로 옮기기
{
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
			// 중첩함수들
			function calculateDistance() {
				let result = 0
				for (let i = 1; i < points.length; i++) {
					result += distance(points[i - 1], points[i])
				}
				return result
			}
			function distance(p1, p2) {
				const EARTH_RADIUS = 3959 // in miles
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
			// 복사. 인수 points 에 의존
			function calculateDistance() {
				let result = 0
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
			function calculateTime() {}
		}
		// 최상위에 붙여넣기 후 임시 이름 사용. 의존 매개변수 입력
		function XXcalculateDistance(points) {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
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
			function calculateDistance() {
				let result = 0
				for (let i = 1; i < points.length; i++) {
					result += distance(points[i - 1], points[i])
				}
				return result
				// radians 함수 사용, calculateDistance함수에서만 사용 => 이동
				function distance(p1, p2) {
					const EARTH_RADIUS = 3959 // in miles
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
				// distance 함수에서만 사용 => 이동
				function radians(degrees) {
					return (degrees * Math.PI) / 180
				}
			}
			function calculateTime() {}
		}
		function XXcalculateDistance(points) {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
			// radians 함수에 의존, calculateDistance함수에서만 사용 => 이동
			function distance(p1, p2) {
				const EARTH_RADIUS = 3959 // in miles
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
			// distance 함수에서만 사용 => 이동
			function radians(degrees) {
				return (degrees * Math.PI) / 180
			}
		}
	} // 내부 calculateDistance 함수와 외부함수가 일치하니 호출함수를 변경 매개변수 전달
	{
		function trackSummary(points) {
			const totalTime = calculateTime()
			const totalDistance = XXcalculateDistance(points)
			const pace = totalTime / 60 / totalDistance
			return {
				time: totalTime,
				distance: totalDistance,
				pace: pace,
			}
			// function calculateDistance() {
			// 	let result = 0
			// 	for (let i = 1; i < points.length; i++) {
			// 		result += distance(points[i - 1], points[i])
			// 	}
			// 	return result
			// 	function distance(p1, p2) {
			// 		const EARTH_RADIUS = 3959 // in miles
			// 		const dLat = radians(p2.lat) - radians(p1.lat)
			// 		const dLon = radians(p2.lon) - radians(p1.lon)
			// 		const a =
			// 			Math.pow(Math.sin(dLat / 2), 2) +
			// 			Math.cos(radians(p2.lat)) *
			// 				Math.cos(radians(p1.lat)) *
			// 				Math.pow(Math.sin(dLon / 2), 2)
			// 		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
			// 		return EARTH_RADIUS * c
			// 	}
			// 	function radians(degrees) {
			// 		return (degrees * Math.PI) / 180
			// 	}
			// }
			function calculateTime() {}
		}
		function XXcalculateDistance(points) {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result
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
	} // 테스트 이상없을 시 내부 함수 제거
	{
		function trackSummary(points) {
			const totalTime = calculateTime()
			// 함수이름 변경 ,기존이름도 변경 혹은 호출문 인라인
			// const totalDistance = totalDistance(points)
			const pace = totalTime / 60 / totalDistance(points)
			return {
				time: totalTime,
				distance: totalDistance(points),
				pace: pace,
			}
			function calculateTime() {}
		}
		// 함수이름 변경
		function totalDistance(points) {
			let result = 0
			for (let i = 1; i < points.length; i++) {
				result += distance(points[i - 1], points[i])
			}
			return result

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
			const pace = totalTime / 60 / totalDistance(points)
			return {
				time: totalTime,
				distance: totalDistance(points),
				pace: pace,
			}
			function calculateTime() {}
		}
		function totalDistance(points) {
			let result = 0
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
}
