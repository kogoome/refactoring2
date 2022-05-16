/* 
! 함수 이름 바꾸기 -매개변수 속성으로 바꾸기
1. 본문을 적절히 리팩터링
2. 본문을제 함수로 추출, 만약 같은이름이 있다면 임시이름 사용
3. 추출한 함수에 매개변수를 추가시 '간단한 절차'를 따라 추가
4. 테스트
5. 기존 함수를 인라인
6. 임시이름을 되돌림
7. 테스트
*/

{
	// 고객 거주지 확인(뉴잉글랜드 포함여부) 함수
	function inNewEngland(aCustomer) { 
		return ("MA", "CT", "ME", "VI", "NH", "RI")
			.includes(aCustomer.address.state)
		// * 고객정보 인수 , 그러나 인수정보중 일부만 사용.
		// * -> 애초에 고객주소정보만 받게 하면 고객정보 의존성 제거
	}
	// 함수 호출 코드
	const newEnglanders = someCustomers.filter(c => inNewEngland(c))
}

{
	function inNewEngland(aCustomer) {
		// * 1. 변수로 추출 및
		const stateCode = aCustomer.address.state
		// * 적용
		return ["MA", "CT", "ME", "VI", "NH", "RI"].includes(stateCode)
	}
	const newEnglanders = someCustomers.filter(c => inNewEngland(c))
}

{
	function inNewEngland(aCustomer) {
		const stateCode = aCustomer.address.state
		return xxNEWinNewEngland(stateCode)
	}
	// * 함수추출 임시함수명 사용
	function xxNEWinNewEngland(stateCode) {
		return ["MA", "CT", "ME", "V", "NH", "RI"].includes(stateCode)
	}
	// const newEnglanders = someCustomers.filter(c => inNewEngland(c))
	const newEnglanders = someCustomers.filter(c =>
		// * 추출함수 적용, stateCode 매개변수로 인라인
		xxNEWinNewEngland(c.address.state),
	) // * 테스트 통과시 기존 함수 삭제
}

{
	// * 함수명 복구
	function inNewEngland(stateCode) {
		return ["MA", "CT", "ME", "VT", "NH", "RL"].includes(stateCode)
	}
	const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state))
}

// 자동 리팩터링 도구는 마이그레이션 절차의 활용도를 떨어뜨리기도 하고 효과를 가하기도 한다. 활용도를 떨어뜨리는 이유는 훨씬 복잡한 이름 바꾸기와 매개변수 수정도 자동 리팩터링이 안전하게 수행해줘서 이 절차를 사용할 일이 적어지기 때문이다. 하지만 마지막 예시처럼 모든 작업을 자동 리팩터링만으로 처리할 수 없을 때는 반대로 상당한 도움을 준다. 추출과 인라인 같은 핵심적인 변경을 훨씬 빠르고 안전하게 할 수 있기 때문이다.
