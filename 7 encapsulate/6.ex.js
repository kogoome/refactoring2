// ! 배송추적정보 클래스가 역할을 못해 Shipment 클래스로 인라인하려한다.
class TrackingInformation {
	#shippingCompany
	#trackingNumber
	get shippingCompany() {
		return this.#shippingCompany
	}
	set shippingCompany(arg) {
		this.#shippingCompany = arg
	}
	get trackingNumber() {
		return this.#trackingNumber
	}
	set trackingNumber(arg) {
		this.#trackingNumber = arg
	}
	get display() {
		return `${this.shippingCompany}: ${this.trackingNumber}`
	}
}

class Shipment {
	#trackingInformation
  constructor() {
    this.#trackingInformation = new TrackingInformation()
  }
	get trackingInfo() {
		return this.#trackingInformation.display
	}
	get trackingInformation() {
		return this.#trackingInformation
	}
	set trackingInformation(aTrackingInformation) {
		this.#trackingInformation = aTrackingInformation
	}
}
aShipment.trackingInformation.shippingCompany = request.vendor
// 1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
// 2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
// 3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
// 4. 소스 클래스를 삭제하고 조의를 표한다.

{

}
