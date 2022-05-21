// ! 클래스 메서드 다른 클래스로 옮기기

// todo 0. 옮길 메서드 찾기
// todo 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// todo 2. 함수가 다형 메서드인지 확인
// todo 3. 함수를 타깃 컨텍스트로 복사.
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// 8. 소스 함수를 인라인할지 고민
{
	// 계좌일반
	class Account {
		#daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			// 은행 수수료
			let result = 4.5
			if (this.#daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		get overdraftCharge() {
			// 당좌 대월 요금, 계좌종류에 따라 요금산정이 달라진다고 가정
			// todo 0. 옮길 메서드, AccountType 클래스로 옮기기
			// * need : AccountType.isPremium, Account.#daysOverdrawn
			// * call : Account.bankCharge()
			if (this.type.isPremium) {
				const baseCharge = 10
				if (this.#daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (this.#daysOverdrawn - 7) * 0.85
			} else return this.#daysOverdrawn * 1.75
		}
	}
	// 계좌종류
	class AccountType {
		isPremium
		// todo 3. 함수를 타깃 컨텍스트로 복사.
	}
}
// 0. 옮길 메서드 찾기
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사.
// todo 4. 정적 분석
// todo 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// todo 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// todo 7. 테스트
// 8. 소스 함수를 인라인할지 고민
{
	// 계좌일반
	class Account {
		#daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			if (this.#daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		get overdraftCharge() {
			// 0. 옮길 메서드, AccountType 클래스로 옮기기-ok
			// todo 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
			if (this.type.isPremium) {
				const baseCharge = 10
				if (this.#daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (this.#daysOverdrawn - 7) * 0.85
			} else return this.#daysOverdrawn * 1.75
		}
	}
	class AccountType {
		isPremium
		// 3. 함수를 타깃 컨텍스트로 복사-ok
		overdraftCharge(daysOverdrawn) {
			// 0. 옮길 메서드, AccountType 클래스로 옮기기-ok
			// todo 4. 정적 분석-ok
			// * need : AccountType.isPremium -> this.isPremium-ok
			// * need : Account.#daysOverdrawn -> 매개변수로 받기-ok
			// * call :
			if (this.isPremium) {
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
// 0. 옮길 메서드 찾기
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사.
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// todo 8. 소스 함수를 인라인할지 고민
{
	// 계좌일반
	class Account {
		#daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			// todo 8. 소스 함수를 인라인할지 고민
			if (this.#daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		// todo 소스함수 인라인시 제거
		get overdraftCharge() {
			// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정-ok, 테스트-ok
			this.type.overdraftCharge(this.#daysOverdrawn)
		}
	}
	class AccountType {
		isPremium
		overdraftCharge(daysOverdrawn) {
			// * call : Account.overdraftCharge()
			if (this.isPremium) {
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
{
	// 계좌일반
	class Account {
		#daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			// 8. 소스 함수를 인라인할지 고민-ok
			if (this.#daysOverdrawn > 0)
				result += this.type.overdraftCharge(this.#daysOverdrawn)
			return result
		}
		// 소스함수 인라인시 제거-ok
		// get overdraftCharge() {
		// }
	}
	class AccountType {
		isPremium
		overdraftCharge(daysOverdrawn) {
			// * call : Account.overdraftCharge()
			if (this.isPremium) {
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
