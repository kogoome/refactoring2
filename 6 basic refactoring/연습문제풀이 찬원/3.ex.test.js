// 문제 1 다음을 변수추출하기를 이용하여 리팩토링 하시오
{
	function price(order) {
		return (
			order.quantity * order.itemPrice -
			Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
			Math.min(order.quantity * order.itemPrice * 0.1, 100)
		)
	}
}
{
	// 풀이
	{
		function price(order) {
			return (
				order.quantity * order.itemPrice -
				Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
				Math.min(order.quantity * order.itemPrice * 0.1, 100)
			) // 로직 구조가 직관적으로 보이지 않음. 구조를 변수로 단순화.
			// 구조 : 가격 = 제품가격 - 수량할인 + 배송비
		}
	}
	{
		function price(order) {
			// 구조 : 가격 = 제품가격 - 수량할인 + 배송비
			// 제품가격 변수작성
			const productsPrice = order.quantity * order.itemPrice
			return (
				order.quantity * order.itemPrice -
				Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
				Math.min(order.quantity * order.itemPrice * 0.1, 100)
			)
		}
	}
	{
		function price(order) {
			// 구조 : 가격 = 제품가격 - 수량할인 + 배송비
			const productsPrice = order.quantity * order.itemPrice
			// 수량할인 변수작성
			const quantityDiscount =
				Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
			// shipping fee 변수작성, 변수명은 한글로 입력하고 확장으로 번역변환하여 사용함
			const shippingFee = Math.min(productsPrice * 0.1, 100)
			return (
				// 변수 치환
				productsPrice - quantityDiscount + shippingFee
			)
		}
	}
}
// 문제 2 다음을 메서드 추출하기를 이용하여 리팩토링 하시오
{
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
}
{
	// 풀이
	{
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
				// 로직 구조 : 가격 = 제품가격 - 수량할인 + 배송비
				return (
					this.quantity * this.itemPrice - // 제품가격
					Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 + // 수량할인
					Math.min(this.quantity * this.itemPrice * 0.1, 100) // 배송비
				)
			}
		}
	}
	{
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

			// 함수추출
			get productPrice() {
				return this.quantity * this.itemPrice
			}
			get price() {
				return (
					this.productPrice - // product price 추출 및 적용
					Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 + // 수량할인
					Math.min(this.quantity * this.itemPrice * 0.1, 100) // 배송비
				) // 테스팅
			}
		}
	}
	{
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

			get productPrice() {
				return this.quantity * this.itemPrice
			}
			// 같은 방식으로 함수추출
			get quantityDiscount() {
				return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05
			}
			get shippingFee() {
				return Math.min(this.productPrice * 0.1, 100)
			}
			get price() {
				// 같은 방식으로 적용 및 테스트
				return this.productPrice - this.quantityDiscount + this.shippingFee
			}
		}
	}
}
