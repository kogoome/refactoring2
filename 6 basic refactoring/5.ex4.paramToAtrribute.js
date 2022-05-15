// * 매개변수를 속성으로 바꾸기

// 지금까지는 이름을 바꾸거나 매개변수 하나만 추가하는 단순한 예만 살펴봤다. 하지만 마이그레이션 절차를 따른다면 훨씬 복잡한 상황도 꽤 깔끔하게 처리할 수 있다. 이번에는 좀 더 복잡한 예를 살펴보자.

// 고객이 뉴잉글랜드에 살고 있는지 확인하는 함수가 있다고 하자.

// 옮긴이 미국 북동부 지역으로 메인주 (MA), 코네티컷주(CT), 매사추세츠주(ME), 버몬트주(VT), 뉴햄프셔주(NH), 로드아일랜드주(RI)의 총 6개 주로 이루어져 있다.
{
	function inNewEngland(aCustomer) {
		return ("MA", "CT", "ME", "VI", "NH", "RI").includes(
			aCustomer.address.state,
		)
		// ! 매개변수의 쓰임이 하나의 속성만 쓰인다면 애초에 속성만 매개변수로 전달한다.
	}

	// 다음은 이 함수를 호출하는 코드 중 하나다.
	const newEnglanders = someCustomers.filter(c => inNewEngland(c))
}
// inNewEngland() 함수는 고객이 거주하는 주 이름을 보고 뉴잉글랜드에 사는지 판단한다. 나라면 이 함수가 주 식별 코드를 매개변수로 받도록 리팩터링할 것이다. 그러면 고객에 대한 의존성이 제거되어 더 넓은 문맥에 활용할 수 있기 때문이다.

// 절차(1) 나는 함수 선언을 바꿀 때 함수 추출(6.1)부터 하는 편이다. 하지만 이번 코드는 함수 본문을 살짝 리팩터링해두면 이후 작업이 더 수월해질 터라 우선 매개변수로 사용할 코드를 변수로 추출(6.3)해둔다.
{
	function inNewEngland(aCustomer) {
		const stateCode = aCustomer.address.state
		return ["MA", "CT", "ME", "VI", "NH", "RI"].includes(stateCode)
	}
}
// 이제 함수 추출하기(6.1)로 새 함수를 만든다.
{
	function inNewEngland(aCustomer) {
		const stateCode = aCustomer.address.state
		return xxNEWinNewEngland(stateCode)
	}
	function xxNEWinNewEngland(stateCode) {
		return ["MA", "CT", "ME", "V", "NH", "RI"].includes(stateCode)
	}

	// 새 함수의 이름을 나중에 기존 함수 이름으로 바꾸기 쉽도록 검색하기 좋은 이름을 붙여둔다. (예시들을 보면 알겠지만 나는 임시 이름 짓기에 특별히 정해둔 규칙은 없다).

	// 그런 다음 기존 함수 안에 변수로 추출해둔 입력 매개변수를 인라인한다(변수 인라인하기(6.4)).

	const newEnglanders = someCustomers.filter(c =>
		xxNEWinNewEngland(c.address.state),
	)
}
// 기존 함수를 모든 호출문에 인라인했다면, 함수 선언 바꾸기를 다시 한번 적용하여 새 함수의 이름을 기존 함수의 이름으로 바꾼다.

{
	function inNewEngland(stateCode) {
		return ["MA", "CT", "ME", "VT", "NH", "RL"].includes(stateCode)
	}
	const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state))
}
// 자동 리팩터링 도구는 마이그레이션 절차의 활용도를 떨어뜨리기도 하고 효과를 가하기도 한다. 활용도를 떨어뜨리는 이유는 훨씬 복잡한 이름 바꾸기와 매개변수 수정도 자동 리팩터링이 안전하게 수행해줘서 이 절차를 사용할 일이 적어지기 때문이다. 하지만 마지막 예시처럼 모든 작업을 자동 리팩터링만으로 처리할 수 없을 때는 반대로 상당한 도움을 준다. 추출과 인라인 같은 핵심적인 변경을 훨씬 빠르고 안전하게 할 수 있기 때문이다.
