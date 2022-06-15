{
	// ? plumages 깃털,
	function plumages(birds: bird[]) {
		return new Map(birds.map((bird) => [bird.name, plumage(bird)]))
	}
	// ? velocity 속력,
	function speeds(birds: bird[]) {
		return new Map(birds.map((bird) => [bird.name, airSpeedVelocity(bird)]))
	}
	// ! 스위치로 구현되어있는 조건문을 다형성으로 변환
	function plumage(bird: bird) {
		switch (bird.type) {
			case 'EuropeanSwallow': // ? 유럽 제비
				return 'average'
			case 'AfricanSwallow':
				return bird.numberOfCoconuts > 2 ? 'tired' : 'average'
			case 'NorwegianBlueParrot': // ? 노르웨이 파랑 앵무새
				return bird.voltage > 100 ? 'scorched' : 'beautiful'
			default:
				return 'unknown'
		}
	}
	function airSpeedVelocity(bird: bird) {
		switch (bird.type) {
			case 'EuropeanSwallow':
				return 35
			case 'AfricanSwallow':
				return 40 - 2 * bird.numberOfCoconuts
			case 'NorwegianBlueParrot':
				return bird.isNailed ? 0 : 10 + bird.voltage / 10
			default:
				return null
		}
	}

	type bird = {
		name: string
		type: 'EuropeanSwallow' | 'AfricanSwallow' | 'NorwegianBlueParrot'
		numberOfCoconuts: number
		isNailed: boolean
		voltage: number
	}

	// let e1: bird = { name: 'e1', type: 'EuropeanSwallow' }
	// let e2: bird = { name: 'e2', type: 'EuropeanSwallow' }
	// let a1: bird = { name: 'a1', type: 'AfricanSwallow', numberOfCoconuts: 1 }
	// let a2: bird = { name: 'a2', type: 'AfricanSwallow', numberOfCoconuts: 0 }
	// let a3: bird = { name: 'a3', type: 'AfricanSwallow', numberOfCoconuts: 5 }
	// let n1: bird = {
	// 	name: 'n1',
	// 	type: 'NorwegianBlueParrot',
	// 	isNailed: false,
	// 	voltage: 0,
	// }
	// let n2: bird = {
	// 	name: 'n2',
	// 	type: 'NorwegianBlueParrot',
	// 	isNailed: true,
	// 	voltage: 100,
	// }
	// let n3: bird = {
	// 	name: 'n3',
	// 	type: 'NorwegianBlueParrot',
	// 	isNailed: false,
	// 	voltage: 300,
	// }
	// let birds: bird[] = [e1, e2, a1, a2, a3, n1, n2, n3]

	// plumages(birds)
	/* 
		Map { 'e1' => 'average',
					'e2' => 'average',
					'a1' => 'average',
					'a2' => 'average',
					'a3' => 'tired',
					'n1' => 'beautiful',
					'n2' => 'beautiful',
					'n3' => 'scorched' }
	*/
	// speeds(birds)
	/* 
		Map { 'e1' => 35,
					'e2' => 35,
					'a1' => 38,
					'a2' => 40,
					'a3' => 30,
					'n1' => 10,
					'n2' => 0,
					'n3' => 40 }
	*/
}
// todo 1. 다형적 동작을 표현하는 클래스들이 없다면 만든다.
// - 적합한 인스턴스를 알아서 반환하는 팩터리 함수도 만든다
// 2. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
// 3. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
// - 조건부 로직이 온전한 함수로 분리되어 있지 않다면 먼저 함수로 추출한다.
{
	type aBird = {
		name: string
		type: 'EuropeanSwallow' | 'AfricanSwallow' | 'NorwegianBlueParrot'
		numberOfCoconuts: number
		isNailed: boolean
		voltage: number
	}
	// todo 클래스 생성
	class Bird {
		constructor(public bird: aBird) {
			// Object.assign(this, bird)
		}

		get plumage() {
			switch (this.bird.type) {
				case 'EuropeanSwallow':
					return 'average'
				case 'AfricanSwallow':
					return this.bird.numberOfCoconuts > 2 ? 'tired' : 'average'
				case 'NorwegianBlueParrot':
					return this.bird.voltage > 100 ? 'scorched' : 'beautiful'
				default:
					return 'unknown'
			}
		}

		get airSpeedVelocity() {
			switch (this.bird.type) {
				case 'EuropeanSwallow':
					return 35
				case 'AfricanSwallow':
					return 40 - 2 * this.bird.numberOfCoconuts
				case 'NorwegianBlueParrot':
					return this.bird.isNailed ? 0 : 10 + this.bird.voltage / 10
				default:
					return null
			}
		}
	}

	function plumages(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, plumage(bird)]))
	}
	function speeds(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, airSpeedVelocity(bird)]))
	}
	// todo 함수에 클래스메서드 호출 적용
	function plumage(bird: aBird) {
		return new Bird(bird).plumage
	}
	// todo 함수에 클래스메서드 호출 적용
	function airSpeedVelocity(bird: aBird) {
		return new Bird(bird).airSpeedVelocity
	}
}
// todo 1. 팩터리함수도 만든다.
// todo 2. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
// 3. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
// - 조건부 로직이 온전한 함수로 분리되어 있지 않다면 먼저 함수로 추출한다.
// todo 4. 서브클래스 중 하나를 선택, 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드 한다.
// - 조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 서브클래스메서드로 복사한 다음 적절히 수정한다.
// todo 5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
// todo 6. 슈퍼클래스 메서드에는 기본동작 부분만 남긴다. 혹은 슈퍼클래스가 추상클래스영야 한다면, 이 메서드를 추상으로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던진다.

{
	type aBird = {
		name: string
		type: 'EuropeanSwallow' | 'AfricanSwallow' | 'NorwegianBlueParrot'
		numberOfCoconuts: number
		isNailed: boolean
		voltage: number
	}
	// todo 클래스 생성
	class Bird {
		constructor(public bird: aBird) {
			// Object.assign(this, bird)
		}

		get plumage() {
			switch (this.bird.type) {
				case 'EuropeanSwallow':
					// return 'average'
					throw '서브클래스가 함'
				case 'AfricanSwallow':
					// return this.bird.numberOfCoconuts > 2 ? 'tired' : 'average'
					throw '서브클래스가 함'
				case 'NorwegianBlueParrot':
					// return this.bird.voltage > 100 ? 'scorched' : 'beautiful'
					throw '서브클래스가 함'
				default:
					return 'unknown'
			}
		}

		get airSpeedVelocity(): number | null {
			switch (this.bird.type) {
				case 'EuropeanSwallow':
					// return 35
					throw '서브클래스가 함'
				case 'AfricanSwallow':
					// return 40 - 2 * this.bird.numberOfCoconuts
					throw '서브클래스가 함'
				case 'NorwegianBlueParrot':
					// return this.bird.isNailed ? 0 : 10 + this.bird.voltage / 10
					throw '서브클래스가 함'
				default:
					return null
			}
		}
	}
	// todo 서브클래스 작성
	class EuropeanSwallow extends Bird {
		get plumage() {
			return 'average' as const
		}
		get airSpeedVelocity() {
			return 35
		}
	}
	class AfricanSwallow extends Bird {
		get plumage() {
			return this.bird.numberOfCoconuts > 2 ? 'tired' : 'average'
		}
		get airSpeedVelocity() {
			return 40 - 2 * this.bird.numberOfCoconuts
		}
	}
	class NorwegianBlueParrot extends Bird {
		get plumage() {
			return this.bird.voltage > 100 ? 'scorched' : 'beautiful'
		}
		get airSpeedVelocity() {
			return this.bird.isNailed ? 0 : 10 + this.bird.voltage / 10
		}
	}

	// todo 인스턴스 생성 팩터리함수 작성
	function createBird(bird: aBird) {
		switch (bird.type) {
			case 'EuropeanSwallow':
				return new EuropeanSwallow(bird)
			case 'AfricanSwallow':
				return new AfricanSwallow(bird)
			case 'NorwegianBlueParrot':
				return new NorwegianBlueParrot(bird)
			default:
				return new Bird(bird)
		}
	}

	function plumages(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, plumage(bird)]))
	}
	function speeds(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, airSpeedVelocity(bird)]))
	}
	function plumage(bird: aBird) {
		return new Bird(bird).plumage
	}
	function airSpeedVelocity(bird: aBird) {
		return new Bird(bird).airSpeedVelocity
	}
}

// todo 자바스크립트 슈퍼클래스 없에기

{
	type aBird = {
		name: string
		type: 'EuropeanSwallow' | 'AfricanSwallow' | 'NorwegianBlueParrot'
		numberOfCoconuts: number
		isNailed: boolean
		voltage: number
	}
	// todo 클래스 제거

	class EuropeanSwallow {
		constructor(public bird: aBird) {
			// Object.assign(this, bird)
		}
		get plumage() {
			return 'average' as const
		}
		get airSpeedVelocity() {
			return 35
		}
	}
	class AfricanSwallow {
		constructor(public bird: aBird) {
			// Object.assign(this, bird)
		}
		get plumage() {
			return this.bird.numberOfCoconuts > 2 ? 'tired' : 'average'
		}
		get airSpeedVelocity() {
			return 40 - 2 * this.bird.numberOfCoconuts
		}
	}
	class NorwegianBlueParrot {
		constructor(public bird: aBird) {
			// Object.assign(this, bird)
		}
		get plumage() {
			return this.bird.voltage > 100 ? 'scorched' : 'beautiful'
		}
		get airSpeedVelocity() {
			return this.bird.isNailed ? 0 : 10 + this.bird.voltage / 10
		}
	}

	// todo 인스턴스 생성 팩터리함수 작성
	function createBird(bird: aBird) {
		switch (bird.type) {
			case 'EuropeanSwallow':
				return new EuropeanSwallow(bird)
			case 'AfricanSwallow':
				return new AfricanSwallow(bird)
			case 'NorwegianBlueParrot':
				return new NorwegianBlueParrot(bird)
			// default:
			// 	return new Bird(bird)
		}
	}

	function plumages(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, plumage(bird)]))
	}
	function speeds(birds: aBird[]) {
		return new Map(birds.map((bird) => [bird.name, airSpeedVelocity(bird)]))
	}

	function plumage(bird: aBird) {
		return createBird(bird).plumage
	}
	function airSpeedVelocity(bird: aBird) {
		return createBird(bird).airSpeedVelocity
	}
}
