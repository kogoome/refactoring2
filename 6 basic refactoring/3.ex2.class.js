// * 클래스에서 변수 추출하기

class Order {
	constructor(aRecord) {
		this._data = aRecord
	}
	get quantity() {
		return this._data.quantity
	}
	get itemPrice() {
		return this._data.itemPrice
	}
	get price() {
		return (
			this.quantity * this.itemPrice -
			Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
			Math.min(this.quantity * this.itemPrice * 0.1, 100)
		)
	}
}

// 이번에도 추출하려는 이름은 같다. 하지만 그 이름이 가격을 계산하는 price() 메서드의 범위를 넘어, 주문을 표현하는 Order 클래스 전체에 적용된다. 이처럼 클래스 전체에 영향을 줄 때는 나는 변수가 아닌 메서드로 추출하는 편이다.

class Order {
	constructor(aRecord) { this._data = aRecord }

	get quantity() { return this._data.quantity }
	get itemPrice() { return this._data.itemPrice }
  get price() { return this.basePrice - this.quantityDiscount + this.shipping }
	get basePrice() { return this.quantity * this.itemPrice }
	get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 }
	get shipping() { return Math.min(this.basePrice * 0.1, 100) }
}

// 여기서 객체의 엄청난 장점을 볼 수 있다. 객체는 특정 로직과 데이터를 외부와 공유하려 할 때공유할 정보를 설명해주는 적당한 크기의 문맥이 되어준다. 이 예처럼 간단한 경우라면 효과가크지 않지만, 덩치가 큰 클래스에서 공통 동작을 별도 이름으로 뽑아내서 추상화해두면 그 객체를 다룰 때 쉽게 활용할 수 있어서 매우 유용하다.

