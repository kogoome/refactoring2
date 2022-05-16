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
{
	// 문제 2 풀이
	{
		// 원의둘레 = circumference이므로 함수명을 변경한다.
		// 1. 본문을 추출, 새 함수 작성, 기존함수에 새 함수 호출, 테스팅
		function circum(radius) {
			return circumference(radius)
		}
		function circumference(radius) {
			return 2 * Math.PI * radius
		}

		const result = circum(mathData.radius)
	}
	{
		// 함수 호출부에 기존함수 내용을 인라인으로 작성, 기존함수 삭제, 테스트
		// function circum(radius) {
		// 	return circumference(radius)
		// }
		function circumference(radius) {
			return 2 * Math.PI * radius
		}

		const result = circumference(mathData.radius)
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
{
	// 문제 3 풀이
	{
		class Book {
			// 우선예약 정보를 입력받을 임시함수 작성
			AAaddReservation(customer) {
				this._reservations.push(customer)
			}
			// 임시함수 본문에서 호출
			addReservation(customer) {
				this.AAaddReservation(customer)
			}
			// 테스트
		}
	}
	{
		class Book {
			// 우선예약 매개변수 추가
			AAaddReservation(customer, aPriority) {
				assertion(aPriority === true, "우선예약은 true만 가능합니다.")
				// 어설션으로 매개변수 작동확인
				this._reservations.push(customer)
			}
			// 기존함수 매개변수 false추가
			addReservation(customer) {
				this.AAaddReservation(customer, false)
			}
			// 테스트
		}
	}
	{
		class Book {
			addReservation(customer, aPriority) {
				assertion(aPriority === true, "우선예약은 true만 가능합니다.")
				this._reservations.push(customer)
			}
			// 기존함수 사용처에 새로운 함수 적용 테스트
			// 성공시 기존함수 삭제
			// 함수명 복원
			// 우선예약 기능 추가
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
{
	// 문제 4 풀이
	{
		function inNewEngland(aCustomer) {
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(
				aCustomer.address.state,
			) // 정보의 입력값과 사용값의 비대칭. 입력값을 제한할 필요.
		}
		const newEnglanders = someCustomers.filter(c => inNewEngland(c))
	}
	{
		function inNewEngland(aCustomer) {
			// 변수 추출
			const state = aCustomer.address.state
			// 변수 적용
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(state)
		}
		// 로직 함수 추출
		function AAinNewEngland(state) {
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(state)
		}
		const newEnglanders = someCustomers.filter(c => inNewEngland(c))
	}
	{
		function inNewEngland(aCustomer) {
			const state = aCustomer.address.state
			// 새 함수 호출 적용
			return AAinNewEngland(state)
		}
		function AAinNewEngland(state) {
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(state)
		}
		const newEnglanders = someCustomers.filter(c => inNewEngland(c))
	} // 테스팅
	{
		function inNewEngland(aCustomer) {
			const state = aCustomer.address.state // 기존함수 작동부
			return AAinNewEngland(state)
		}
		function AAinNewEngland(state) {
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(state)
		}
		// 기존함수 -> 새함수로 전환
		// 기존함수 작동부 호출매개변수에 인라인 적용
		const newEnglanders = someCustomers.filter(c =>
			AAinNewEngland(c.address.state),
		)
	} // 테스팅
	{
		// 기존함수 제거, 새함수 이름 복구
		function inNewEngland(state) {
			return ("MA", "CT", "ME", "VI", "NH", "RI").includes(state)
		}
		const newEnglanders = someCustomers.filter(c =>
			AAinNewEngland(c.address.state),
		)
	}
}
