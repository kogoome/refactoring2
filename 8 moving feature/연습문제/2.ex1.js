// 문제 1 discountRate 를 CustomerContract 클래스로 옮기시오.
// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
// 2. 테스트
// 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// 4. 정적 검사
// 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거
// 10. 테스트

class Customer {
	#name
	#contract
	#discountRate
	constructor(name, discountRate) {
		this.#name = name
		this.#discountRate = discountRate
		this.#contract = new CustomerContract(this.dateToday())
	}
	get discountRate() {
		return this.#discountRate
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

const customer = new Customer('John', 0.1)
console.log(customer.discountRate)
customer.becomePreferred()
console.log(customer.discountRate)
console.log(customer.dateToday())
