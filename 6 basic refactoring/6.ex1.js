// 전역 변수에 중요한 데이터가 담겨 있는 경우를 생각해보자.
{
	let defaultOwner = { firstName: "마틴", lastName: "파울러" }

	// 데이터라면 당연히 다음과 같이 참조하는 코드가 있을 것이다.
	spaceship.owner = defaultOwner

	// 갱신하는 코드 역시 있을 것이다.
	defaultOwner = { firstName: "레베카", lastName: "파슨스" }
}
// 1. 기본적인 캡슐화를 위해 가장 먼저 데이터를 읽고 쓰는 함수부터 정의한다.
{
	function getDefaultOwner() {
		return defaultOwner
	}
	function setDefaultOwner(arg) {
		defaultOwner = arg
	}
	// 3. 그런 다음 defaultOwner를 참조하는 코드를 찾아서 방금 만든 게터 함수를 호출하도록 고친다.
	spaceship.owner = getDefaultOwner()
	// 대입문은 세터 함수로 바꾼다.
	setDefaultOwner({ firstName: "레베카", lastName: "파슨스" })
}
// 하나씩 바꿀 때마다 테스트한다.

// 4. 모든 참조를 수정했다면 이제 변수의 가시 범위를 제한한다. 그러면 미처 발견하지 못한 참조가 없는지 확인할 수 있고, 나중에 수정하는 코드에서도 이 변수에 직접 접근하지 못하게 만들 수 있다. 자바스크립트로 작성할 때는 변수와 접근자 메서드를 같은 파일로 옮기고 접근자만 노출시키면 된다.

// defaultOwner.js 파일...
let defaultOwner = { firstName: "마틴", lastName: "파울러" }
export function getDefaultOwner() {
	return defaultOwner
}
export function setDefaultOwner(arg) {
	defaultOwner = arg
}

// 변수로의 접근을 제한할 수 없을 때는 변수 이름을 바꿔서 다시 테스트해보면 좋다. 이렇게 한다고 해서 나중에 직접 접근하지 못하게 막을 수 있는 건 아니지만, __privateOnly_defaultOwner처럼 공개용이 아니라는 의미를 담으면서도 눈에 띄는 이름으로 바꾸면 조금이나마 도움이 된다.

// 마지막으로, 나는 게터 이름 앞에 get을 붙이는 것을 싫어해서 get을 빼도록 하겠다.

// defaultOwner.js 파일...
let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
export function getDefaultOwner() {
	return defaultOwnerData
}
export function setDefaultOwner(arg) {
	defaultOwnerData = arg
}

// 자바스크립트에서는 게터와 세터의 이름을 똑같이 짓고 인수가 있냐 없냐에 따라 구분하는 방식을 많이 따른다. 나는 이 방식을 오버로딩된 게터-세터라고 부르며, 아주 싫어한다. 그래서 get은 붙이지 않겠지만 set은 계속 붙이겠다.
