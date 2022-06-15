// 문제1 다음 trackSummary의 중첩함수를 외부로 옮기시오
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사.
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// 8. 소스 함수를 인라인할지 고려
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
