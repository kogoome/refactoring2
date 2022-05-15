// * 진정한 값 객체로 거듭나기

// 앞서 운을 띄웠듯이 매개변수 그룹을 객체로 교체하는 일은 진짜 값진 작업의 준비단계일 뿐이다. 앞에서처럼 클래스로 만들어두면 관련 동작들을 이 클래스로 옮길 수 있다는 이점이 생긴다. 이 예에서는 온도가 허용 범위 안에 있는지 검사하는 메서드를 클래스에 추가할 수 있다.

function readingsOutsideRange(station, range) {
	return station.readings.filter(r => !range.contains(r.temp))
}

// - NumberRange 클래스....
class NumberRange {
	contains(arg) {
		return arg >= this.min && arg <= this.max
	}
}

// 지금까지 한 작업은 여러 가지 유용한 동작을 갖춘 범위(Range) 클래스*를 생성하기 위한 첫 단계다. 코드에 범위 개념이 필요함을 깨달았다면 최댓값과 최솟값 쌍을 사용하는 코드를 발견할 때마다 범위 객체로 바꾸자(당장 operatingPlan의 temperatureFloor와 temperatureCeiling을 temperatureRange로 교체할 수 있다), 이러한 값 쌍이 어떻게 사용되는지 살펴보면 다른 유용한 동작도 범위 클래스로 옮겨서 코드베이스 전반에서 값을 활용하는 방식을 간소화할 수 있다. 나라면 진정한 값 객체로 만들기 위해 값에 기반한 동치성 검사 메서드equality method부터 추가할 것이다.
