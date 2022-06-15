{
	function alertForMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				setOffAlarms()
				return 'joker'
			}
			if (p === 'saruman') {
				setOffAlarms()
				return 'saruman'
			}
		}
		return ''
	}
}
// todo 1. 대상함수 복제, 질의 목적에 충실한 이름 짓기 (리턴값 참고)
// todo 2. 새 질의 함수에서 부수효과 제거
// todo 3. 정적 검사를 수행
// 4. 원래 함수(변경함수)가 호출되는곳을 모두 찾고, 호출하는 곳에서 반환값을 사용한다면 질의함수를 호출하도록 변경, 테스트
// 5. 원래 함수에서 질의코드를 제거
// 6. 테스트
{
	function alertForMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				setOffAlarms()
				return 'joker'
			}
			if (p === 'saruman') {
				setOffAlarms()
				return 'saruman'
			}
		}
		return ''
	}
	// todo 새함수 복사 질의만 남기고 함수 이름짓기
	function findMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				return 'joker'
			}
			if (p === 'saruman') {
				return 'saruman'
			}
		}
		return ''
	}
}
// todo 4. 원래 함수(변경함수)가 호출되는곳을 모두 찾고, 호출하는 곳에서 반환값을 사용한다면 질의함수를 호출하도록 변경, 테스트
// 5. 원래 함수에서 질의코드를 제거
// 6. 테스트
{
	function alertForMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				setOffAlarms()
				return 'joker'
			}
			if (p === 'saruman') {
				setOffAlarms()
				return 'saruman'
			}
		}
		return ''
	}
	function findMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				return 'joker'
			}
			if (p === 'saruman') {
				return 'saruman'
			}
		}
		return ''
	}
	// todo 호출하는 곳을 찾아서 새로운 질의함수를 호출하도록 변경
	// const found = alertForMiscreant(people)
	const found = findMiscreant(people)
	alertForMiscreant(people)
}
// todo 5. 원래 함수에서 질의코드를 제거
// todo 6. 테스트
{
	function alertForMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				setOffAlarms()
				return
			}
			if (p === 'saruman') {
				setOffAlarms()
				return
			}
		}
		return
	}
	function findMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				return 'joker'
			}
			if (p === 'saruman') {
				return 'saruman'
			}
		}
		return ''
	}
	const found = findMiscreant(people)
	alertForMiscreant(people)
}
// todo 중복코드 개선
{
	function alertForMiscreant(people) {
		if (findMiscreant(people) === '') setOffAlarms()
	}
	function findMiscreant(people) {
		for (const p of people) {
			if (p === 'joker') {
				return 'joker'
			}
			if (p === 'saruman') {
				return 'saruman'
			}
		}
		return ''
	}
	const found = findMiscreant(people)
	alertForMiscreant(people)
}
