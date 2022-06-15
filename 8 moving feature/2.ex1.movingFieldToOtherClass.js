{
	class Customer {
		constructor(name, discountRate) {
			this._name = name
			// ! discountRate 를 CustomerContract 클래스로 옮기려고 한다.
			this._discountRate = discountRate
			this._contract = new CustomerContract(this.dateToday())
		}
		get discountRate() {
			return this._discountRate
		}
		becomePreferred() {
			this._discountRate += 0.03
			// other nice things
		}
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this._discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		constructor(startDate) {
			this._startDate = startDate
		}
	}
}

// todo 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
// todo 2. 테스트
// 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// 4. 정적 검사
// 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거
// 10. 테스트
{
	class Customer {
		constructor(name, discountRate) {
			this._name = name
			// ! discountRate 를 CustomerContract 클래스로 옮기려고 한다.
			// todo 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
			this._discountRate = discountRate
			this._contract = new CustomerContract(this.dateToday())
		}
		get discountRate() {
			return this._discountRate
		}
		becomePreferred() {
			this._discountRate += 0.03
			// other nice things
		}
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this._discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		constructor(startDate) {
			this._startDate = startDate
		}
	}
}
{
	class Customer {
		#name
		#contract
		// ! discountRate 를 CustomerContract 클래스로 옮기기
		// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
		#discountRate
		constructor(name, discountRate) {
			this.#name = name
			this.#setDiscountRate(discountRate) // 세터 적용
			this.#contract = new CustomerContract(this.dateToday())
		}
		// todo 옮길 필드 접근메서드
		get discountRate() {
			return this.#discountRate
		}
		// todo 옮길 필드 접근메서드
		// 캡슐화 후 프라이빗 세터 메서드 작성
		#setDiscountRate(aNumber) {
			this.#discountRate = aNumber
		}
		becomePreferred() {
			this.#discountRate += 0.03
		}
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this.#discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		#startDate
		constructor(startDate) {
			this.#startDate = startDate
		}
	}
}
// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
// 2. 테스트
// todo 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// todo 4. 정적 검사
// todo 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인
// todo 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거
// 10. 테스트
{
	class Customer {
		#name
		#contract
		// ! discountRate 를 CustomerContract 클래스로 옮기기
		// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화-ok
		#discountRate
		constructor(name, discountRate) {
			this.#name = name
			this.#setDiscountRate(discountRate)
			// 필드 데이터 전달
			this.#contract = new CustomerContract(this.dateToday(), discountRate)
		}
		// todo 옮긴 필드 참조 수정
		get discountRate() {
			return this.#discountRate
		}
		// todo 옮긴 필드 참조 수정
		#setDiscountRate(aNumber) {
			this.#discountRate = aNumber
		}
		// todo 옮긴 필드 참조 수정
		becomePreferred() {
			this.#discountRate += 0.03
		}
		// todo 옮긴 필드 참조 수정
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this.#discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		#startDate
		#discountRate // 3. 필드생성-ok
		constructor(startDate, discountRate) {
			this.#startDate = startDate
			this.#discountRate = discountRate
		}
		// 3. 접근메서드 생성-ok
		get discountRate() {
			return this.#discountRate
		}
		// 3. 접근메서드 생성-ok
		set discountRate(arg) {
			this.#discountRate = arg
		}
	}
}
// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
// 2. 테스트
// 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// 4. 정적 검사
// 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// todo 9. 소스 필드를 제거
// todo 10. 테스트
{
	class Customer {
		#name
		#contract
		// ! discountRate 를 CustomerContract 클래스로 옮기기
		// todo 테스트 이상 없을 시 소스필드 제거
		#discountRate
		constructor(name, discountRate) {
			this.#name = name
			// 필드 데이터 전달
			this.#contract = new CustomerContract(this.dateToday(), discountRate)
			// 세터는 컨트랙트에 의존하므로 생성 이후 작동하도록 변경
			this.#setDiscountRate(discountRate)
		}
		// 옮긴 필드 참조 수정-ok
		get discountRate() {
			return this.#contract.discountRate
		}
		// 옮긴 필드 참조 수정-ok
		#setDiscountRate(aNumber) {
			this.#contract.discountRate = aNumber
		}
		// 옮긴 필드 참조 수정-ok
		becomePreferred() {
			this.#contract.discountRate = 0.03 + this.#contract.discountRate
		}
		// 옮긴 필드 참조 수정-ok
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this.#contract.discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		#startDate
		#discountRate // 3. 필드생성-ok
		constructor(startDate, discountRate) {
			this.#startDate = startDate
			this.#discountRate = discountRate
		}
		// 3. 접근메서드 생성-ok
		get discountRate() {
			return this.#discountRate
		}
		// 3. 접근메서드 생성-ok
		set discountRate(arg) {
			this.#discountRate = arg
		}
	}
}

{
	class Customer {
		#name
		#contract
		//  테스트 이상 없을 시 소스필드 제거
		// #discountRate
		constructor(name, discountRate) {
			this.#name = name
			this.#contract = new CustomerContract(this.dateToday(), discountRate)
			// this.#setDiscountRate(discountRate)
		}
		get discountRate() {
			return this.#contract.discountRate
		}
		#setDiscountRate(aNumber) {
			this.#contract.discountRate = aNumber
		}
		becomePreferred() {
			this.#contract.discountRate = 0.03 + this.#contract.discountRate
		}
		applyDiscount(amount) {
			return amount.subtract(amount.multiply(this.#contract.discountRate))
		}
		dateToday() {
			return new Date()
		}
	}

	class CustomerContract {
		#startDate
		#discountRate
		constructor(startDate, discountRate) {
			this.#startDate = startDate
			this.#discountRate = discountRate
		}
		get discountRate() {
			return this.#discountRate
		}
		set discountRate(arg) {
			this.#discountRate = arg
		}
	}
}
