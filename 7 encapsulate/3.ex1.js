// 레코드 구조에서 데이터를 읽어 들이는 단순한 주문order 클래스를 살펴보자. 이 클래스의 우선순위 priority 속성은 값을 간단히 문자열로 표현한다.

// - Order 클래스...

class Order {
	constructor(data) {
		this.priority = data.priority
	} // 나머지 초기화 코드 생략
}

// 클라이언트에서는 이 코드를 다음처럼 사용한다.

// 클라이언트...
highPriorityCount = orders.filter(
	o => "high" === o.priority || "rush" === o.priority,
).length

// 1. 나는 데이터 값을 다루기 전에 항상 변수부터 캡슐화한다.

// - Order 클래스...
class Order {
	constructor(data) {
		this.priority = data.priority
	}
	get priority() {
		return this._priority
	}
	set priority(aString) {
		this.priority = aString
	}
}

// 옮긴이 단계 0에서 변수를 갭슐화하면서 만든 세터를 말한다.옮긴이 단계 0에서 변수를 캡슐화하면서 만든 게터를 말한다.

// 하는 생성자에서 방금 정의한 세터를 사용할 수 있다.이렇게 필드를 자가 캡슐화self encapsulation 하면 필드 이름을 바꿔도 클라이언트 코드는 유지할 수있다.

// 이제 우선순위 속성을 초기화

// 2. 다음으로 우선순위 속성을 표현하는 값 클래스 Priority를 만든다. 이 클래스는 표현할 값을 받는 생성자와 그 값을 문자열로 반환하는 변환 함수로 구성된다.

class Priority {
	constructor(value) {
		this._value = value
	}
	toString() {
		return this._value
	}
}

// 이 상황에서는 개인적으로 게터(value())보다는 변환 함수(toString())를 선호한다. 클라이언트 입장에서 보면 속성 자체를 받은 게 아니라 해당 속성을 문자열로 표현한 값을 요청한게 되기 때문이다.

// 95 그런 다음 방금 만든 Priority 클래스를 사용하도록 접근자들을 수정한다.

// Order 클래스...
class Order {
	constructor(data) {
		this.priority = data.priority
	}
	get priority() {
		return this._priority
	}
	set priority(aString) {
		this.priority = aString
	}
	get priority() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new Priority(aString)
	}
}

// 1. 이렇게 Priority 클래스를 만들고 나면 Order 클래스의 게터가 이상해진다. 이 게터가 반환하는 값은 우선순위 자체가 아니라 우선순위를 표현하는 문자열이다. 그러니 즉시 함수 이름을 바꿔준다(함수 선언 바꾸기 4.58).

// - Order 클래스...
class Order {
	constructor(data) {
		this.priority = data.priority
	}
	get priority() {
		return this._priority
	}
	set priority(aString) {
		this.priority = aString
	}
	get priority() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new Priority(aString)
	}
	get priorityString() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new Priority(aString)
	}
}
// 클라이언트...
highPriorityCount = orders.filter(
	o => "high" === o.priorityString || "rush" === o.priorityString,
).length

// 지금처럼 매개변수 이름만으로 세터가 받는 데이터의 유형을 쉽게 알 수 있다면 세터의 이름은그대로 둬도 좋다.

// ## 더 가다듬기

// 공식적인 리팩터링은 여기까지다. 그런데 Priority 클래스를 사용하는 코드를 살펴보면, 서 이 클래스를 직접 사용하는 것이 과연 좋은지 고민해봤다. 그 결과 Priority 객체를 제공하는 게터를 Order 클래스에 만드는 편이 낫겠다고 판단했다.

// - Order 클래스....
class Order {
	constructor(data) {
		this.priority = data.priority
	}
	get priority() {
		return this._priority
	}
	set priority(aString) {
		this.priority = aString
	}
	get priority() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new Priority(aString)
	}
	get priorityString() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new Priority(aString)
	}
	get priority() {
		return this._priority
	}
	get priorityString() {
		return this._priority.toString()
	}
	set priority(aString) {
		this._priority = new PriorityString()
	}
}

// --- 클라이언트...
highPriorityCount = orders.filter(
	o => "high" === o.priority.toString() || "rush" === o.priority.toString(),
).length

// Priority 클래스는 다른 곳에서도 유용할 수 있으니 Order의 세터가 Priority 인스턴스를 받도록 해주면 좋다. 이를 위해 Priority의 생성자를 다음과 같이 변경한다.

// - Priority 클래스 ...
class Priority {
	constructor(value) {
		if (value instanceof Priority) return value
		this._value = value
	}
	toString() {
		return this._value
	}
}

// 이렇게 하는 목적은 어디까지나 Priority 클래스를 새로운 동작을 담는 장소로 활용하기 위해서다. 여기서 새로운 동작이란 새로 구현한 것일 수도, 다른 곳에서 옮겨온 것일 수도 있다. 우선순위 값을 검증하고 비교하는 로직을 추가한 예를 준비했다.

// - Priority 클래스...
class Priority {
	constructor(value) {
		if (value instanceof Priority) return value
		if (Priority.legalValues().includes(value)) this._value = value
		else throw new Error(`<${value}>는 유효하지 않은 우선순위입니다.`)
	}
	toString() {
		return this._value
	}
	toString() {
		return this.value
	}
	get index() {
		return Priority.legalValues().findIndex(s => 5 === this.value)
	}
	static legalValues() {
		return ["low", "normal", "high", "rush"]
	}
	equals(other) {
		return this, index === other.index
	}
	higherThan(Other) {
		return this._index > other.index
	}
	lowerThan(other) {
		return this, index < other.index
	}
}

// 이렇게 수정하면서 우선순위를 값 객체로 만들어야겠다고 판단했다. 따라서 equals()메서드를 추가하고 불변이 되도록 만들었다.

// 이처럼 동작을 추가하면 클라이언트 코드를 더 의미 있게 작성할 수 있다.

// 클라이언트....

highPriorityCount = orders.filter(
	(o = o.priority.higherThan(new Priority("normal"))),
).length
