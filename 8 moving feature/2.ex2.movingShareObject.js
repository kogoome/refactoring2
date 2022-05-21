// todo 0. 타깃
// todo 1. 캡슐화
// todo 2. 테스트
// 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// 4. 정적 검사
// 5. 소스 객체에서 타깃 객체 참조가능 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거

const { assert } = require("chai")

// 10. 테스트
{
	class Account {
		constructor(number, type, interestRate) {
			this._number = number
			this._type = type
			this._interestRate = interestRate // todo 타깃
		}
		get interestRate() {
			return this._interestRate
		}
	}
	class AccountType {
		constructor(nameString) {
			this._name = nameString
		}
	}
}
// todo 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성
// todo 4. 정적 검사
// 5. 소스 객체에서 타깃 객체 참조가능 확인
// 6. 접근자들이 타깃 필드를 사용하도록 수정
// 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// 8. 테스트
// 9. 소스 필드를 제거
// 10. 테스트
{
	class Account {
    #number
    #type
    #interestRate // todo 타깃
		constructor(number, type, interestRate) {
			this.#number = number
			this.#type = type
			this.#interestRate = interestRate
		}
		get interestRate() {
			return this.#interestRate
		}
	}
	class AccountType {
    #name
		// 3. 타깃 클래스에 필드 생성-ok
		#interestRate // todo 타깃
		constructor(nameString, interestRate) {
      this.#name = nameString
			this.#interestRate = interestRate // 4. 매개변수전달 및 초기화 
		}
    // 3. 타깃 클래스에 메서드 생성-ok
		get interestRate() {
			return this.#interestRate
		}
	}
}
// todo 5. 소스 객체에서 타깃 객체 참조가능 확인
// todo 6. 접근자들이 타깃 필드를 사용하도록 수정
// todo 7. 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서 일관성을 깨뜨리는 갱신을 검출할 수 있도록 어서션을 추가 시작하자. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
// todo 8. 테스트
// 9. 소스 필드를 제거
// 10. 테스트
{
	class Account {
    #number
    #type
    #interestRate // todo 타깃
		constructor(number, type, interestRate) {
			this.#number = number
			this.#type = type
			this.#interestRate = interestRate
			// 7.어설션추가 8. 현재객체와 타겟객체의 사용성이 같은지 테스트
      assert(this.#interestRate === this.#type.interestRate )
		}

		get interestRate() {
			// 5. 타깃객체 참조가능, 6. 사용 수정가능-ok
      return this.#type.interestRate 
		}
	}
	class AccountType {
    #name
		#interestRate 
		constructor(nameString, interestRate) {
      this.#name = nameString
			this.#interestRate = interestRate
		}
		get interestRate() {
			return this.#interestRate
		}
	}
}
// todo 9. 소스 필드를 제거
// todo 10. 테스트
{
	class Account {
		#number
		#type
		// #interestRate // todo 타깃
		constructor(number, type, interestRate) {
			this.#number = number
			this.#type = type // 타겟 클래스
      // 9. 소스필드 제거
			// this.#interestRate = interestRate
      // assert(this.#interestRate === this.#type.interestRate)
		}
		get interestRate() {
      return this.#type.interestRate 
		}
	}
	class AccountType {
    #name
		#interestRate
		constructor(nameString, interestRate) {
      this.#name = nameString
			this.#interestRate = interestRate 
		}
		get interestRate() {
			return this.#interestRate
		}
	}
}
