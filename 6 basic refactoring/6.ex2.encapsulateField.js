/*
* 데이터 캡슐화 - 클래스 필드
1. 변수 접근 갱신(get set) 캡슐화 함수 작성
2. 정적 검사드
3. 변수 직접 참조 -> 캡슐화 함수로 대체, 테스트
4. 변수 접근 범위 제한. 참조때문에 제한이 안되면 이름 바꿔 테스트 참조하는곳 찾아 수정
5. 테스트
TODO 6. 변수 값이 레코드면 레코드 캡슐화하기(7.1) 적용 고려  
*/

{
	let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
	export function defaultOwner() {
		return defaultOwnerData
	}
	export function defaultOwner(arg) {
		defaultOwnerData = arg
	}
}

// 위 방식으로 캡슐화 하면 defaultOwnerData를 직접 수정하지는 못하지만, 게터값이 원본을 참조하기 때문에
// 게터 데이터를 수정하면 원본데이터도 변경.

const owner1 = defaultOwner()
assert.equal("파울러", owner1.lastName, "처음 값 확인") // 일치
const owner2 = defaultOwner()
owner2.lastName = "파슨스"
assert.equal("파슨스", owner1.lastName, "owner2를 변경한 후 ") // 일치

// 게터로 참조한 데이터를 변경하면 원본값이 변경. 이를 방지하기 위해 게터가 데이터 복제본을 반환하게 수정

{
	// defaultOwner.js...
	let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
	function defaultOwner() {
		return Object.assign({}, defaultOwnerData)
	}
	function setDefaultOwner(arg) {
		defaultOwnerData = arg
	}
}
// 특히 리스트에 이 기법을 많이 적용한다. 데이터의 복제본을 반환하면 클라이언트는 게터로 얻은 데이터를 변경할 수 있지만 원본에는 아무 영향을 주지 못한다. 단, 주의할 점이 있다. 공유데이터(원본)를 변경하기를 원하는 클라이언트가 있을 수 있다. 이럴 때 나는 문제가 될만한부분을 테스트로 찾는다. 아니면 아예 변경할 수 없게 만들 수도 있다. 이를 위한 좋은 방법이 레코드 캡슐화하기 1절다.

let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
export function defaultOwner() {
	return new Person(defaultOwnerData)
}

export function setDefaultOwner(arg) {
	defaultOwnerData = arg
}
class Person {
	constructor(data) {
		this._lastName = data.lastName
		this._firstName = data.firstName
	}
	get lastName() {
		return this._lastName
	}
	get firstName() {
		return this._firstName
	} // 다른 속성도 이런 식으로 처리한다.
}
// 이렇게 하면 defaultOwnerData의 속성을 다시 대입하는 연산은 모두 무시된다. 이런 변경을감지하거나 막는 구체적인 방법은 언어마다 다르므로 사용하는 언어에 맞는 방법으로 처리하면 된다.

// 이처럼 변경을 감지하여 막는 기법을 임시로 활용해보면 도움될 때가 많다. 변경하는 부분을없앨 수도 있고, 적절한 변경 함수를 제공할 수도 있다. 적절히 다 처리하고 난 뒤 게터가 복제본을 반환하도록 수정하면 된다.

// 지금까지는 게터에서 데이터를 복제하는 방법을 살펴봤는데, 세터에서도 복제본을 만드는 편이 좋을 수도 있다. 정확한 기준은 그 데이터가 어디서 오는지, 원본 데이터의 모든 변경을 그대로 반영할 수 있도록 원본으로의 링크를 유지해야 하는지에 따라 다르다. 링크가 필요 없다.

// 면 데이터를 복제해 저장하여 나중에 원본이 변경돼서 발생하는 사고를 방지할 수 있다. 복제본 만들기가 번거로울 때가 많지만, 이런 복제가 성능에 주는 영향은 대체로 미미하다. 반면, 원본을 그대로 사용하면 나중에 디버깅하기 어렵고 시간도 오래 걸릴 위험이 있다.

// 여기서 명심할 점이 있다. 앞에서 설명한 복제본 만들기와 클래스로 감싸는 방식은 레코드 구조에서 깊이가 1인 속성들까지만 효과가 있다. 더 깊이 들어가면 복제본과 객체 래핑 단계가 더 늘어나게 된다.

// 지금까지 본 것처럼 데이터 캡슐화는 굉장히 유용하지만 그 과정은 간단하지 않을 때가 많다. 캡슐화의 구체적인 대상과 방법은 캡슐화할 데이터를 사용하는 방식과 그 데이터를 어떻게 변경하려는 지에 따라 달라진다. 하지만 분명한 사실은 데이터의 사용 범위가 넓을수록 적절히 캡슐화하는 게 좋다는 것이다.
