class Order {
	constructor(quantity, item) {
		this._quantity = quantity
		this._item = item
	}
	get price() {
		// ! basePrice 와 discountFactor를 메서드로 바꿔보자.
		var basePrice = this._quantity * this._item.price
		var discountFactor = 0.98
		if (basePrice > 1000) discountFactor -= 0.03
		return basePrice * discountFactor
	}
}
// ! basePrice 
// todo 1. 변수 사용시 로직이 다른 결과를 내는지 확인
// todo 2. 가능하면 읽기전용으로 작성
// todo 3. 테스트
// 4. 변수 대입문 함수로 추출
// 5. 테스트
// 6. 변수 인라인 임시변수 제거
{
	class Order {
		#quantity
		#item
		constructor(quantity, item) {
			this.#quantity = quantity
			this.#item = item
		}
		get price() {
			// 가능하면 변수를 읽기전용으로 작성
			const basePrice = this.#quantity * this.#item.price
			let discountFactor = 0.98 // 값을 수정하는 로직 존재
			if (basePrice > 1000) discountFactor -= 0.03
			return basePrice * discountFactor
		}
	}
}
// ! basePrice 
// todo 4. 변수 대입문 함수로 추출
// todo 5. 테스트
// 6. 변수 인라인 임시변수 제거
{
	class Order {
		#quantity
		#item
		constructor(quantity, item) {
			this.#quantity = quantity
			this.#item = item
		}
		get price() {
			// 함수로 추출
			const basePrice = this.basePrice
			let discountFactor = 0.98
			if (basePrice > 1000) discountFactor -= 0.03
			return basePrice * discountFactor
		}
		get basePrice() {
			return this.#quantity * this.#item.price
		}
	}
}
// ! basePrice 
// todo 6. 변수 인라인 임시변수 제거
{
	class Order {
		#quantity
		#item
		constructor(quantity, item) {
			this.#quantity = quantity
			this.#item = item
		}
		get price() {
			// 변수 인라인
			// const basePrice = this.basePrice
			let discountFactor = 0.98
			if (this.basePrice > 1000) discountFactor -= 0.03
			return this.basePrice * discountFactor
		}
		get basePrice() {
			return this.#quantity * this.#item.price
		}
	}
}
// ! discountFactor 
// todo 1. 변수 사용시 로직이 다른 결과를 내는지 확인
// todo 2. 가능하면 읽기전용으로 작성
// todo 3. 테스트
// todo 4. 변수 대입문 함수로 추출
// todo 5. 테스트
// 6. 변수 인라인 임시변수 제거
{
	class Order {
		#quantity
		#item
		constructor(quantity, item) {
			this.#quantity = quantity
			this.#item = item
		}
		get price() {
      // 변수 로직 함수로 추출
			let discountFactor = this.discountFactor
			return this.basePrice * discountFactor
		}
		get basePrice() {
			return this.#quantity * this.#item.price
		}
    get discountFactor() {
      let discountFactor = 0.98
			if (this.basePrice > 1000) discountFactor -= 0.03
      return discountFactor
    }
	}
}
// ! discountFactor 
// todo 6. 변수 인라인 임시변수 제거
{
	class Order {
		#quantity
		#item
		constructor(quantity, item) {
			this.#quantity = quantity
			this.#item = item
		}
		get price() {
      // 변수 인라인
			return this.basePrice * this.discountFactor
		}
		get basePrice() {
			return this.#quantity * this.#item.price
		}
    get discountFactor() {
      let discountFactor = 0.98
			if (this.basePrice > 1000) discountFactor -= 0.03
      return discountFactor
    }
	}
}