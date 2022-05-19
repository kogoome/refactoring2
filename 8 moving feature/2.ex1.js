{
	class Customer {
		constructor(name, discountRate) {
			this._name = name
			this._discountRate = discountRate
			// discountRate 를 CustomerContract 클래스로 옮기려고 한다.
			// 1. 먼저 이 필드를 캡슐화하자.
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
		#discountRate
		constructor(name, discountRate) {
			this.#name = name
			this.#setDiscountRate(discountRate) // 세터 적용
			this.#contract = new CustomerContract(this.dateToday())
		}
		get discountRate() {
			return this.#discountRate
		}
		// 캡슐화 후 세터 작성
		#setDiscountRate(aNumber) {
			this.#discountRate = aNumber
		}
		becomePreferred() {
			this.#discountRate += 0.03
			// other nice things
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
// 할인율을 수정하는 public 세터를 만들고 싶지는 않아서 세터 속성이 아니라 메서드를 이용했다.
// 3. 이제 CustomerContract 클래스에 필드 하나와 접근자들을 추가한다.
{
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
// 6. 그런 다음 Customer의 접근자들이 새로운 필드를 사용하도록 수정한다. 다 수정하고 나면 "Cannot set property 'discountRate' of undefined"라는 오류가 날 것이다("discountRate 속성은 정의되지 않았으므로 설정할 수 없습니다" 라는 뜻이다), 생성자에서 Contract 객체를 생성하기도 전에 _setDiscountRate()를 호출하기 때문이다. 이 오류를 고치려면 먼저 기존 상태로 되돌린 다음. 문장 슬라이드하기를 적용해 setDiscountRate() 호출을 계약 생성 뒤로 옮겨야 한다.
{
	class Customer {
		#name
		#contract
		#discountRate
		constructor(name, discountRate) {
			this.#name = name
			this.#setDiscountRate(discountRate) 
			this.#contract = new CustomerContract(this.dateToday())
		}
		get discountRate() {
			return this.#discountRate
		}
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
