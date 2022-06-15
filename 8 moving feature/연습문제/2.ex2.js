// 문제 2 다음 이자율을 계자종류 클래스로 옮기시오.
// 0. 타깃
// 1. 캡슐화
// 2. 테스트
// 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// 4. 정적 검사
// 5. 소스 객체에서 타깃 객체 참조가능 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거

const { assert } = require("chai")

// 10. 테스트
class Account {
	#number
	#type
	#interestRate
	constructor(number, type, interestRate) {
		this.#number = number
		this.#type = type
		this.#interestRate = interestRate // ! 타깃

	}
	get interestRate() {
		return this.#interestRate
	}
}
class AccountType {
	#name
	constructor(nameString) {
		this.#name = nameString
	}
}
const accType = new AccountType('예금', 0.01)
const acc = new Account('123-4567-8901', accType, 0.01)
console.log(acc.interestRate)