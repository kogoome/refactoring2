{
	class Account {
		_daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			if (this._daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		get overdraftCharge() {
			// 이 메서드를 AccountType 클래스로 옮겨보자
			if (this.type.isPremium) {
				const baseCharge = 10
				if (this.daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (this.daysOverdrawn - 7) * 0.85
			} else return this.daysOverdrawn * 1.75
		}
	}
	class AccountType {
		isPremium
	}
}
/* 
이제부터 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 고쳐보자. 그러려면 마이너스 통장의 초과 인출 이자를 계산하는 overdraftCharge()를 계좌 종류 클래스인 AccountType으로 옮기는 게 자연스러울 것이다.

1. 첫 단계로 overdraftCharge() 메서드가 사용하는 기능들을 살펴보고, 그 모두를 한꺼번에옮길만한 가치가 있는지 고민해보자. 이 예에서는 daysOverdrawn() 메서드는 Account 클래스에 남겨둬야 한다. (계좌 종류가 아닌) 계좌별로 달라지는 메서드이기 때문이다.

3. 다음으로 overdraftCharge() 메서드 본문을 AccountType 클래스로 복사한 후 새 보금자리에 맞게 정리한다.
 */
{
	class Account {
		_daysOverdrawn = 4
		type // AccountType 인스턴스 필드
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
	/* 
	이 메서드를 새 보금자리에 맞추려면 호출 대상 두 개의 범위를 조정해야 한다. isPremium은단순히 this를 통해 호출했다. 한편 daysOverdrawn은 값을 넘길지, 아니면 계좌채로 넘길지정해야 한다. 우선은 간단히 값으로 넘기기로 하자. 하지만 초과 인출된 일수 외에 다른 정보가필요해지면 추후 계좌재로 넘기도록 변경할 수도 있을 것이다. 계좌에서 원하는 정보가 계좌종류에 따라 달라진다면 더욱 그렇다.
	6. 다음으로, 원래 메서드의 본문을 수정하여 새 메서드를 호출하도록 한다. 이제 원래 메서드는 위임 메서드가 된다.
	*/

	class AccountType {
		isPremium
		// 메서드 복붙, 사용변수 매개변수에 추가
		overdraftCharge(daysOverdrawn) {
			if (this.isPremium) {
				// this.type.isPremium 에서 변경.
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
{
	class Account {
		daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			if (this.daysOverdrawn > 0)
				// _ 삭제
				result += this.overdraftCharge
			// overdraftCharge 남겨둘지 인라인할지 결정
			return result
		}
		get overdraftCharge() {
			// 메서드 위임
			return this.type.overdraftCharge(this.daysOverdrawn)
		}
	}

	class AccountType {
		overdraftCharge(daysOverdrawn) {
			if (this.isPremium) {
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
{
	class Account {
		daysOverdrawn = 4
		type // AccountType 인스턴스 필드

		get bankCharge() {
			let result = 4.5
			if (this.daysOverdrawn > 0)
				// overdraftCharge 인라인시
				result += this.type.overdraftCharge(this.daysOverdrawn)
			return result
		}
		// overdraftCharge 메서드 삭제
		// get overdraftCharge() {
		// 	return this.type.overdraftCharge(this.daysOverdrawn)
		// }
	}

	class AccountType {
		overdraftCharge(daysOverdrawn) {
			if (this.isPremium) {
				const baseCharge = 10
				if (daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (daysOverdrawn - 7) * 0.85
			} else return daysOverdrawn * 1.75
		}
	}
}
{
	// 이전 단계들에서 daysOverdrawn을 매개변수로 넘겼지만, 만약 계좌에서 가져와야 할 데이터가 많았다면 다음과 같이 계좌 자체를 넘겼을 것이다.
	class Account {
		daysOverdrawn = 4
		type // AccountType 인스턴스 필드
		constructor() {
			this.type = new AccountType()
		}

		get bankCharge() {
			let result = 4.5
			if (this.daysOverdrawn > 0) result += this.overdraftCharge
			return result
		}
		get overdraftCharge() {
			// 입력값으로 this를 넘김
			return this.type.overdraftCharge(this)
		}
	}

	class AccountType {
		isPremium = true
		overdraftCharge(account) {
			if (this.isPremium) {
				const baseCharge = 10
				if (account.daysOverdrawn <= 7) return baseCharge
				else return baseCharge + (account.daysOverdrawn - 7) * 0.85
			} else return account.daysOverdrawn * 1.75
		}
	}
}
