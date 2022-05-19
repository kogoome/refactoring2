// 문제1. 다음 매개변수를 데이터클래스를 사용하여 전환하시오
{
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
	// 기준온도 이탈 필터링 함수,
	function readingsOutsideRange(station, min, max) {
		return station.readings.filter(r => r.temp < min || r.temp > max)
	}
	// 이탈 기준온도
	const operatingPlan = { temperatureFloor: 50, temperatureCeiling: 55 }
	// * 매개변수의 응집력을 높이시오.
	const alerts = readingsOutsideRange(
		station,
		operatingPlan.temperatureFloor, // 최저 온도
		operatingPlan.temperatureCeiling, // 최고 온도
	)
}
