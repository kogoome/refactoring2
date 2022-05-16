/*
* 데이터 캡슐화 - 함수
1. 변수 접근 갱신(get set) 캡슐화 함수 작성
2. 정적 검사
3. 변수 직접 참조 -> 캡슐화 함수로 대체, 테스트
4. 변수 접근 범위 제한. 참조때문에 제한이 안되면 이름 바꿔 테스트 참조하는곳 찾아 수정
5. 테스트
TODO 6. 변수 값이 레코드면 레코드 캡슐화하기(7.1) 적용 고려  
*/

{
	// 가변 전역 데이터
	let defaultOwner = { firstName: "마틴", lastName: "파울러" }
	// 데이터 참조
	spaceship.owner = defaultOwner
	// 데이터 갱신
	defaultOwner = { firstName: "레베카", lastName: "파슨스" }
}
// * 1. 캡슐화 함수(get, set) 작성
{
	// 가변 전역 데이터
	let defaultOwner = { firstName: "마틴", lastName: "파울러" }

	// 캡슐화 데이터이터
	function getDefaultOwner() {
		return defaultOwner
	}
	function setDefaultOwner(arg) {
		defaultOwner = arg
	}
	// * 3. 게터 세터 함수 적용, 테스트
	spaceship.owner = getDefaultOwner()
	setDefaultOwner({ firstName: "레베카", lastName: "파슨스" })
}

// * 4. 가시 범위 제한, 변수는 export 하지않고 캡슐화 함수만 export
{
	// defaultOwner.js 파일...
	let defaultOwner = { firstName: "마틴", lastName: "파울러" } // 외부노출제한
	export function getDefaultOwner() {
		return defaultOwner
	}
	export function setDefaultOwner(arg) {
		defaultOwner = arg
	}
}
// * 가시범위 제한 불가시 이름앞에 __private__ 붙이기. 다른동료가 덜 건들게.

// 마지막으로, 나는 게터 이름 앞에 get을 붙이는 것을 싫어해서 get을 빼도록 하겠다.
{
	// defaultOwner.js 파일...
	let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
	export function defaultOwner() {
		return defaultOwnerData
	}
	export function setDefaultOwner(arg) {
		defaultOwnerData = arg
	}
}
// * 오버로딩된 게터-세터
{
	let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }
	// 같은 이름의 함수에 인수가 있냐 없냐에 따라 게터세터가 오버로딩.
	// 직관적이지 못하다.
	export function defaultOwner() {
		return defaultOwnerData
	}
	export function defaultOwner(arg) {
		defaultOwnerData = arg
	}
}
