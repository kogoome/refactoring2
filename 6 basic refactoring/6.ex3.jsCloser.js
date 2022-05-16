// 클로저 사용
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
