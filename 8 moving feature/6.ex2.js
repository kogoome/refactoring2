// 1. 코드 이동 목표 위치 찾기. 이동시 수행 간섭이 생기는지 살피고 있다면 포기
// 2. 이동
// 3. 테스트
function ex2() {
	let result
	if (availableResources.length == 0) {
		result = createResource()
		allocatedResources.push(result) // 중복
	} else {
		result = availableResources.pop()
		allocatedResources.push(result) // 중복
	}
	return result
}
function ex2() {
	let result
	if (availableResources.length == 0) {
		result = createResource()
	} else {
		result = availableResources.pop()
	}
	allocatedResources.push(result) // 이동
	return result
}
/* 
더 읽을거리

문장 교환하기 Swap sentence * 라는 이름의 거의 똑같은 리팩터링도 있다. 문장 교환하기는 인접한 코드 조각을 이동하지만, 문장 하나짜리 조각만 취급한다. 따라서 이동할 조각과 건너뛸 조각 모두 단일 문장으로 구성된 문장 슬라이드로 생각해도 된다. 이 리팩터링도 매력적이다. 나는 항상 단계를 잘게 나눠 리팩터링하는데, 리팩터링을 처음 접하는 이들이 보기에는 어리석어 보일 정도로 작은 단계들을 밟는다.

하지만 종국에는 큰 조각을 다루는 리팩터링만 책에 싣기로 했다. 실제로 내가 그렇게 하기 때문이다. 나는 큰 슬라이드를 수행하기 어려울 때만 한 문장씩 이동한다. 큰 슬라이드에서 어려움을 겪는 일은 드물었다. 하지만 더 지저분한 코드를 정리할 때는 더 작게 슬라이드하는 편이쉬울 것이다.
*/