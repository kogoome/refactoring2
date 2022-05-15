// 괜한 함수추출 롤백
{
	function reportLines(aCustomer) {
		const lines = []
		gatherCustomerData(lines, aCustomer)
		return lines백
	}
	function gatherCustomerData(out, aCustomer) {
		out.push(["name", aCustomer.name])
		out.push(["location", aCustomer.location])
	}
}

{
	// 단순히 잘라 붙이는 식으로는 gatherCustomerData()를 reportLines()로 인라인할 수 없다. 아주 복잡하지는 않고 여전히 단번에 옮기고 약간 수정해주면 될 때도 많지만, 실수하지 않으려면 한 번에 한 문장씩 옮기는 것이 좋다. 그러니 먼저 여러 문장을 호출한 곳으로 옮기기 전를 적용해서 첫 문장부터 시작해보자 (잘라내서, 붙이고, 다듬는 방식으로 간단히 처리한다).
	function reportLines(aCustomer) {
		const lines = []
		lines.push(["name", aCustomer.name])
		gatherCustomerData(lines, aCustomer)
		return lines
	}
	function gatherCustomerData(out, aCustomer) {
		out.push(["name", aCustomer.name])
		out.push(["location", aCustomer.Location])
	}
}
{
	// 나머지 문장도 같은 식으로 처리
	function reportLines(aCustomer) {
		const lines = []
		lines.push(["name", aCustomer.name])
		lines.push(["location", aCustomer.location])
		return lines
	}
}
// 핵심은 항상 단계를 잘게 나눠서 처리하는 데 있다. 평소 내 스타일대로 함수를 작게 만들어뒀다면 인라인을 단번에 처리할 수 있을 때가 많다(물론 약간 다듬어야 할 수 있다). 그러다 상황이 복잡해지면 다시 한 번에 한 문장씩 처리한다. 한 문장을 처리하는 데도 얼마든지 복잡해질 수 있다. 이럴 때는 더 정교한 리팩터링인 문장을 호출한 곳으로 옮기기 절로 작업을더 잘게 나눈다. 어느 정도 자신감이 붙으면 다시 작업을 크게 묶어서 처리한다. 그러다 테스트가 실패하면 가장 최근의 정상 코드로 돌아온 다음, 아쉬운 마음을 달래며 단계를 잘게 나눠서다시 리팩터링한다.
