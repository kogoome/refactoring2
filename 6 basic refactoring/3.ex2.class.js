/*
	! 클래스에서 변수 추출하기
	절차
	1. 표현식 부작용 파악
	2. 불변 변수 선언, 추출 표현식의 복제본 대입
	3. 원본 표현식을 새로 만든 변수로 교체
	4. 테스트
	5. 표현식 사용처가 많을시 각각 교체. 교체시마다 테스트
*/

class Order {
	constructor(aRecord) {
		this._data = aRecord
	}
	get quantity() { return this._data.quantity }
	get itemPrice() { return this._data.itemPrice }

	get price() {
		return (
			this.quantity * this.itemPrice -
			Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
			Math.min(this.quantity * this.itemPrice * 0.1, 100)
		)
	}
}

// * 추출하려는 로직과 이름은 같지만 클래스 전체에 영향을 미치면 메서드로 추출
class Order {
	constructor(aRecord) { this._data = aRecord }

	get quantity() { return this._data.quantity }
	get itemPrice() { return this._data.itemPrice }
	
	get basePrice() { return this.quantity * this.itemPrice }
	get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 }
	get shipping() { return Math.min(this.basePrice * 0.1, 100) }
  get price() { return this.basePrice - this.quantityDiscount + this.shipping }
	/*
		* 변수와 비교
		const basePrice = order.quantity * order.itemPrice
		const quantityDiscount =
			Math.max(0, order.quantity - 500) * order.itemPrice * 0.5
		const shipping = Math.min(basePrice * 0.1, 100)
		return basePrice - quantityDiscount + shipping
	 */

}

// 여기서 객체의 엄청난 장점을 볼 수 있다. 객체는 특정 로직과 데이터를 외부와 공유하려 할 때 공유할 정보를 설명해주는 적당한 크기의 문맥이 되어준다. 이 예처럼 간단한 경우라면 효과가크지 않지만, 덩치가 큰 클래스에서 공통 동작을 별도 이름으로 뽑아내서 추상화해두면 그 객체를 다룰 때 쉽게 활용할 수 있어서 매우 유용하다.

