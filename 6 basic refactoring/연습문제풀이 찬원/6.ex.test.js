// 문제 1 다음 전역데이터를 함수를 이용해 캡슐화하시오.
{
	// 가변 전역 데이터
	let defaultOwner = { firstName: "마틴", lastName: "파울러" }

	// 데이터 참조
	spaceship.owner = defaultOwner

	// 데이터 갱신
	defaultOwner = { firstName: "레베카", lastName: "파슨스" }
}
{ // 풀이
	{
		let defaultOwner = { firstName: "마틴", lastName: "파울러" }
		// 게터세터 작성
		function defaultOwner() {
			return defaultOwner
		}
		function setDefaultOwner(arg) {
			defaultOwner = arg
		}
		// 호출부 적용
		spaceship.owner = defaultOwner()
		setDefaultOwner({ firstName: "레베카", lastName: "파슨스" })
	}
	{
		// 가시성 분리
		{
			// defaultOwner.js...
			let defaultOwner = { firstName: "마틴", lastName: "파울러" }
			export function defaultOwner() {
				return defaultOwner
			}
			export function setDefaultOwner(arg) {
				defaultOwner = arg
			}
		}

    import { defaultOwner, setDefaultOwner } from "./defaultOwner.js"
		spaceship.owner = defaultOwner()
		setDefaultOwner({ firstName: "레베카", lastName: "파슨스" })
	}
}
{ // 클로저 사용
	const owner = (() => {
		let publicGreet = "hello"
		let defaultOwner = { firstName: "마틴", lastName: "파울러" }

		return {
			publicGreet,
			defaultOwner: () => {
				return Object.assign({}, defaultOwner)
			},
			setDefaultOwner: newData => {
				defaultOwner = newData
			},
		}
	})()


	console.log(owner) 
	// { publicGreet: 'hello',
	//   defaultOwner: [λ: defaultOwner],
	//   setDefaultOwner: [λ: setDefaultOwner] }
	owner.publicGreet = "world" // 접근 변경 가능
	console.log(owner) 
	// { publicGreet: 'world',
  // defaultOwner: [λ: defaultOwner],
  // setDefaultOwner: [λ: setDefaultOwner] }
	console.log(owner.defaultOwner())
	// { firstName: "마틴", lastName: "파울러" }
	owner.setDefaultOwner({ firstName: "jane", lastName: "doe" })
	console.log(owner.defaultOwner())
	// { firstName: "jane", lastName: "doe" }
}