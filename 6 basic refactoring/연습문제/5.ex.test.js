// 문제 2 다음을 마이그레이션 절차에 따라 리팩토링하시오
{
	// 문제 2
	{
		function circum(radius) {
			return 2 * Math.PI * radius
		}

		const result = circum(mathData.radius)
	}
}
// 문제 3 다음을 요구사항에 맞춰 마이그레이션 절차에 따라 리팩토링하시오
{
	// 문제 3
	// * 우선예약큐 요구사항 추가
	// * 예약 함수 호출시 일반큐 우선예약큐 지정매개변수 추가할 것
	// * 예약함수를 호출하는 곳을 모두 찾고 고치기가 어려움. -> 마이그레이션 절차로 진행
	class Book {
		addReservation(customer) {
			this._reservations.push(customer)
		}
	}
}
// 문제 4 다음을 요구사항에 맞춰 마이그레이션 절차에 따라 리팩토링하시오
{
	// 문제 4
	function inNewEngland(aCustomer) {
		return ("MA", "CT", "ME", "VI", "NH", "RI").includes(
			aCustomer.address.state,
		)
	}
	const newEnglanders = someCustomers.filter(c => inNewEngland(c))
}
