// 문제 2 다음 계좌 클래스의 overdraftCharge메서드를 AccountType 클래스로 옮기시오.
// 1. 함수내 호출 컨텍스트에서 사용 중인 요소찾기
// 2. 함수가 다형 메서드인지 확인
// 3. 함수를 타깃 컨텍스트로 복사.
// 4. 정적 분석
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 테스트
// 8. 소스 함수를 인라인할지 고려
{
	class Account {
		daysOverdrawn
		type
		constructor(daysOverdrawn, isPremium) {
			this.daysOverdrawn = daysOverdrawn
			this.type = new AccountType(isPremium)
		}

		get bankCharge() {
			let result = 4.5
			if (this._daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		get overdraftCharge() {
			if (this.type.isPremium) {
				const baseCharge = 10
				if (this.daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (this.daysOverdrawn - 7) * 0.85
			} else return this.daysOverdrawn * 1.75
		}
	}
	class AccountType {
		isPremium = false
		constructor(isPremium) {
			this.isPremium = isPremium
		}
	}

	const a = new Account(3, false)
	console.log(a.bankCharge)
	console.log(a.daysOverdrawn)
	console.log(a.overdraftCharge)
	console.log(a.type)
}
