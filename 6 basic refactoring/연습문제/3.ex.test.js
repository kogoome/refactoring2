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
// 문제 2 다음을 메서드 추출하기를 이용하여 리팩토링 하시오
{
  class Order {
		constructor(aRecord) { this._data = aRecord }
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
}