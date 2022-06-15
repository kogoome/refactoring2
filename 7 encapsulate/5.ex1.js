class Person {
	#name
	// ! 전화번호 관련 클래스를 분리하자
	#officeAreaCode
	#officeNumber
	constructor(name, officeAreaCode, officeNumber) {
		this.#name = name
		this.#officeAreaCode = officeAreaCode
		this.#officeNumber = officeNumber
	}
	get name() {
		return this.#name
	}
	set name(arg) {
		this.#name = arg
	}
	// ! 관련 메서드
	get telephoneNumber() {
		return `(${this.officeAreaCode}) ${this.officeNumber}`
	}
	get officeAreaCode() {
		return this.#officeAreaCode
	}
	set officeAreaCode(arg) {
		this.#officeAreaCode = arg
	}
	get officeNumber() {
		return this.#officeNumber
	}
	set officeNumber(arg) {
		this.#officeNumber = arg
	}
}

// todo 1. 클래스의 역할을 분리할 방법을 정한다.
// todo 2. 분리될 역할을 담당할 클래스를 새로 만든다.
// 3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
// 4. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다(필드 옮기기5.2), 하나씩 옮길 때마다 테스트한다.
// 5. 메서드들도 새 클래스로 옮긴다. 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길 때마다 테스트한다.
// 6. 양쪽 클래스의 불필요한 메서드를 제거하고, 이름도 바꾼다. 클래스 노출도를 정한다. 노출시 참조를 값으로 바꿀지 고려.
{
	class Person {
		#name

		#officeAreaCode // 지역번호
		#officeNumber // 전화번호
		constructor(name, officeAreaCode, officeNumber) {
			this.#name = name
			this.#officeAreaCode = officeAreaCode
			this.#officeNumber = officeNumber
		}
		get name() {
			return this.#name
		}
		set name(arg) {
			this.#name = arg
		}
		// 관련 메서드
		get telephoneNumber() {
			return `(${this.officeAreaCode}) ${this.officeNumber}`
		}
		get officeAreaCode() {
			return this.#officeAreaCode
		}
		set officeAreaCode(arg) {
			this.#officeAreaCode = arg
		}
		get officeNumber() {
			return this.#officeNumber
		}
		set officeNumber(arg) {
			this.#officeNumber = arg
		}
	}
	class TelephoneNumber {}
}
// todo 3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
// 4. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다(필드 옮기기5.2), 하나씩 옮길 때마다 테스트한다.
// 5. 메서드들도 새 클래스로 옮긴다. 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길 때마다 테스트한다.
// 6. 양쪽 클래스의 불필요한 메서드를 제거하고, 이름도 바꾼다. 클래스 노출도를 정한다. 노출시 참조를 값으로 바꿀지 고려.
{
	class Person {
		#name
		#telephoneNumber // 전화번호 클래스 인스턴스 생성
		#officeAreaCode
		#officeNumber

		constructor(name, officeAreaCode, officeNumber) {
			this.#name = name
			this.#telephoneNumber = new TelephoneNumber()
			this.#officeAreaCode = officeAreaCode
			this.#officeNumber = officeNumber
		}
		get name() {
			return this.#name
		}
		set name(arg) {
			this.#name = arg
		}
		get telephoneNumber() {
			return `(${this.officeAreaCode}) ${this.officeNumber}`
		}
		get officeAreaCode() {
			return this.#officeAreaCode
		}
		set officeAreaCode(arg) {
			this.#officeAreaCode = arg
		}
		get officeNumber() {
			return this.#officeNumber
		}
		set officeNumber(arg) {
			this.#officeNumber = arg
		}
	}
	class TelephoneNumber {}
}
// todo 4. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다(필드 옮기기5.2), 하나씩 옮길 때마다 테스트한다.
// todo 5. 메서드들도 새 클래스로 옮긴다. 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길 때마다 테스트한다.
// 6. 양쪽 클래스의 불필요한 메서드를 제거하고, 이름도 바꾼다. 클래스 노출도를 정한다. 노출시 참조를 값으로 바꿀지 고려.
{
	class Person {
		#name
		#telephoneNumber // 전화번호 클래스 인스턴스 생성
		#officeAreaCode
		#officeNumber

		constructor(name, officeAreaCode, officeNumber) {
			this.#name = name
			// 인수정보 넘기기
			this.#telephoneNumber = new TelephoneNumber(officeAreaCode, officeNumber)
			this.#officeAreaCode = officeAreaCode
			this.#officeNumber = officeNumber
		}
		get name() {
			return this.#name
		}
		set name(arg) {
			this.#name = arg
		}
		// 메서드 위임, 테스트
		get telephoneNumber() {
			return `(${this.#telephoneNumber.officeAreaCode}) 
        ${this.#telephoneNumber.officeNumber}`
		}
		get officeAreaCode() {
			return this.#telephoneNumber.officeAreaCode
		}
		set officeAreaCode(arg) {
			this.#telephoneNumber.officeAreaCode = arg
		}
		get officeNumber() {
			return this.#telephoneNumber.officeNumber
		}
		set officeNumber(arg) {
			this.#telephoneNumber.officeNumber = arg
		}
	}
	class TelephoneNumber {
		// 필드 생성
		#officeAreaCode
		#officeNumber
		// 생성자에 반영
		constructor(officeAreaCode, officeNumber) {
			this.#officeAreaCode = officeAreaCode
			this.#officeNumber = officeNumber
		}
		// 게터세터 생성
		get officeAreaCode() {
			return this.#officeAreaCode
		}
		set officeAreaCode(arg) {
			this.#officeAreaCode = arg
		}
		get officeNumber() {
			return this.#officeNumber
		}
		set officeNumber(arg) {
			this.#officeNumber = arg
		}
	}
}
// todo 6. 양쪽 클래스의 불필요한 메서드를 제거하고, 이름도 바꾼다. 클래스 노출도를 정한다. 노출시 참조를 값으로 바꿀지 고려.
{
	class TelephoneNumber {
		// 필드 메서드 이름변경
		#areaCode
		#number
		constructor(areaCode, number) {
			this.#areaCode = areaCode
			this.#number = number
		}
		get areaCode() {
			return this.#areaCode
		}
		set areaCode(arg) {
			this.#areaCode = arg
		}
		get number() {
			return this.#number
		}
		set number(arg) {
			this.#number = arg
		}
    // 전화번호 출력 메서드
    toString() {
      return `(${this.#areaCode}) ${this.#number}`
    }
	}
	class Person {
		#name
		#telephoneNumber
		// 필드제거
		constructor(name, officeAreaCode, officeNumber) {
			this.#name = name
			this.#telephoneNumber = new TelephoneNumber(officeAreaCode, officeNumber)
		}
		get name() {
			return this.#name
		}
		set name(arg) {
			this.#name = arg
		}
		// 변경된 이름 반영
		get telephoneNumber() {
      // 새 메서드 참조
			return this.#telephoneNumber.toString()
		}
		get officeAreaCode() {
			return this.#telephoneNumber.areaCode
		}
		set officeAreaCode(arg) {
			this.#telephoneNumber.areaCode = arg
		}
		get officeNumber() {
			return this.#telephoneNumber.number
		}
		set officeNumber(arg) {
			this.#telephoneNumber.number = arg
		}
	}
}
/* 
TODO 전화번호는 여러모로 쓸모가 많으니 이 클래스는 클라이언트에게 공개하는 것이 좋겠다. 그러면 "office"로 시작하는 메서드들을 없애고 TelephoneNumber의 접근자를 바로 사용하도록바꿀 수 있다. 그런데 기왕 이렇게 쓸 거라면 전화번호를 값 객체로 만드는 게 나으니 참조를값으로 바꾸기(9.4)부터 적용한다(자세한 방법은 9.4절의 예시에서 소개한다). 
*/