/* 
! 함수 이름 바꾸기 -마이그레이션
1. 본문을 적절히 리팩터링
2. 본문을 함수로 추출, 만약 같은이름이 있다면 임시이름 사용
3. 추출한 함수에 매개변수를 추가시 '간단한 절차'를 따라 추가
4. 테스트
5. 기존 함수를 인라인
6. 임시이름을 되돌림
7. 테스트
*/
{
	function circum(radius) {
		return 2 * Math.PI * radius // * 추출본문
	}

	// ... circum(mathData.radius) ...
}

{
	// * 2. 본문전체 새로운 함수로 추출,
	function circumference(radius) {
		return 2 * Math.PI * radius
	}
	function circum(radius) {
		return circumference(radius) // * 새로운 함수 호출
	}
	{
		// 기존 함수사용처
		const result = circum(mathData.radius)
	}
	// * 4. 테스트
}

{
	function circumference(radius) {
		return 2 * Math.PI * radius
	}
	{
		// 기존 함수사용처
		const result = circumference(mathData.radius)
		// * 5. 기존 함수본문 인라인, 기존함수 삭제
	}
} // * 7. 하나 변경시마다 테스트

// 리팩터링 대상은 대부분 직접 수정할 수 있는 코드지만, 함수 선언 바꾸기만큼은 공개된 API, 다시 말해 직접 고칠 수 없는 외부 코드가 사용하는 부분을 리팩터링하기에 좋다. 가령 circumference() 함수를 만들고 나서 잠시 리팩터링 작업을 멈춘다. 가능하다면 circum()이 폐기 예정deprecate임을 표시한다. 그런 다음 circum()의 클라이언트들 모두가 circumference()를 사용하게 바뀔 때까지 기다린다. 모든 클라이언트가 새 함수로 갈아탔다면 circum()을 삭제한다. circum()을 삭제하는 상쾌한 순간을 결코 맞이하지 못할 수도 있지만, 새로 작성되는 코드들은 더 나은 이름의 새로운 함수를 사용하게 될 것이다.
