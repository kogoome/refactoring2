// ! 예시: 중첩된 레코드 캡슐화하기

// 앞에서는 단순한 레코드를 캡슐화하는 방법을 살펴봤다. 그런데 JSON 문서처럼 여러 겹 중첩된 레코드라면 어떻게 해야 할까? 리팩터링의 기본 절차는 똑같고 갱신하는 코드에 주의해야 한다는 점도 같지만, 읽는 코드를 다룰 때는 선택지가 몇 가지 더 생긴다.

// 다음과 같이 살짝 중첩된 경우를 보자. 이 데이터는 고객 정보를 저장한 해시맵으로, 고객 ID를 키로 사용한다.

const customerInformationJson = {
	1920: {
		name: "마틴 파울러",
		id: "1920",
		usages: {
			2016: {
				1: 50,
				2: 55,
				// 나머지 달(month)은 생략
			},
			2015: {
				1: 70,
				2: 63, // 나머지 달은 생략 1
			},
		},
	},
	38673: {
		name: "닐 포드",
		id: "38673",
	},
}

// 다른 고객 정보도 같은 형식으로 저장된다.
// 중첩 정도가 심할수록 읽거나 쓸 때 데이터 구조 안으로 더 깊숙히 들어가야 한다.

// 쓰기 예....
customerData[customerID].usages[year][month] = amount

// 읽기 예....
function compareUsage(customerID, laterYear, month) {
	const later = customerData[customerID].usages[laterYear][month]
	const earlier = customerData[customerID].usages[laterYear - 1][month]
	return { laterAmount: later, change: later - earlier }
}

// 이번 캡슐화도 앞에서와 마찬가지로 변수 캡슐화 부터 시작한다.

function getRawDataOfCustomers() {
	return customerData
}
function setRawDataOfCustomers(arg) {
	customerData = arg
}

// 쓰기 예...
getRawDataOfCustomers()[customerID].usages[year][month] = amount
// 읽기 예...
function compareUsage(customerID, laterYear, month) {
	const later = getRawDataOfCustomers()[customerID].usages[laterYear][month]
	const earlier =
		getRawDataOfCustomers()[customerID].usages[laterYear - 1][month]
	return { laterAmount: later, change: later - earlier }
}

// 그런 다음 전제 데이터 구조를 표현하는 클래스를 정의하고, 이를 반환하는 함수를 새로 만든다.

class CustomerData {
	constructor(data) {
		this.data = data
	}
}

// 최상위....

function getCustomerData() {
	return customerData
}
function getRawDataOfCustomers() {
	return customerData._data
}
function setRawDataOfCustomers(arg) {
	customerData = new CustomerData(arg)
}

// 여기서 가장 중요한 부분은 데이터를 쓰는 코드다. 따라서 getRawDataOfCustomers()를 호출한 후 데이터를 변경하는 경우에도 주의해야 한다. 값을 쓰는 예를 다시 한번 상기해보자.

// - 쓰기 예...
getRawDataOfCustomers()[customerID].usages[year][month] = amount

// 기본 절차에 따르면 고객 객체를 반환하고 필요한 접근자를 만들어서 사용하게 하면 된다. 현재 고객 객체에는 이 값을 쓰는 세터가 없어서 데이터 구조 안으로 깊이 들어가서 값을 바꾸고 있다. 따라서 데이터 구조 안으로 들어가는 코드를 세터로 뽑아내는 작업부터 한다(함수 추출하기9.1).

// 쓰기 예...
setUsage(customerID, year, month, amount)
// 최상위....
function setUsage(customerID, year, month, amount) {
	getRawDataOfCustomers()[customerID].usages[year][month] = amount
}

// 그런 다음 이 함수를 고객 데이터 클래스로 옮긴다(함수 옮기기 (1월).

// - 쓰기 예....
getCustomerData().setUsage(customerID, year, month, amount)

// - CustomerData 클래스....
class CustomerData {
	constructor(data) {
		this.data = data
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount
	}
}

// 나는 덩지 큰 데이터 구조를 다룰수록 쓰기 부분에 집중한다. 캡슐화에서는 값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 굉장히 중요하다.

// 이렇게 쓰는 부분을 찾아 수정하다 보면 빠진 건 없는지 궁금해질 것이다. 확인하는 방법은 여러 가지다. 우선 getRawDataOfCustomers()에서 데이터를 깊은 복사 heep corn 하여 반환하는 방법이다. 테스트 커버리지가 충분하다면 깜빡 잊고 수정하지 않는 부분을 테스트가 걸러내줄 것이다.

// 최상위...
function getCustomerData() {
	return customerData
}
function getRawDataOfCustomers() {
	return customerData.rawData
}
function setRawDataOfCustomers(arg) {
	customerData = new CustomerData(arg)
}

// Customer Data 블래스...
class CustomerData {
	constructor(data) {
		this.data = data
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount
	}
	get rawData() {
		return _.cloneDeep(this._data)
	}
}

// 깊은 복사는 lodash 라이브러리가 제공하는 cloneDeep()로 처리했다.

// 데이터 구조의 읽기전용 프락시를 반환하는 방법도 있다. 클라이언트에서 내부 객체를 수정하려 하면 프락시가 예외를 던지도록 하는 것이다. 이 기능을 손쉽게 구현할 수 있는 언어도 있지만, 자바스크립트는 아니다. 그래서 독자에게 연습 문제로 남겨두겠다.

// 또한 복제본을 만들고 이를 재귀적으로 동결해서 쓰기 동작을 감지하는 방법도 있다.쓰기는 주의해서 다뤄야 한다. 그렇다면 읽기는 어떻게 처리해야 할까? 몇 가지 방법을 소개하겠다.

// 첫 번째로, 세터 때와 같은 방법을 적용할 수 있다. 즉, 읽는 코드를 모두 독립 함수로 추출한다음 고객 데이터 클래스로 옮기는 것이다.

// CustomerData 클래스...
class CustomerData {
	constructor(data) {
		this.data = data
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount
	}
	get rawData() {
		return _.cloneDeep(this._data)
	}
	usage(customerID, year, month) {
		return this.data[customerID].usages[year][month]
	}
}

// 최상위....
function compareUsage(customerID, laterYear, month) {
	const later = getCustomerData().usage(customerID, laterYear, month)
	const earlier = getCustomerData().usage(customerID, laterYear - 1, month)
	return { laterAmount: later, change: later - earlier }
}

// 이 방법의 가장 큰 장점은 customerData의 모든 쓰임을 명시적인 API로 제공한다는 것이다. 이 클래스만 보면 데이터 사용 방법을 모두 파악할 수 있다. 하지만 읽는 패턴이 다양하면 그만큼 작성할 코드가 늘어난다. 요즘 언어들에서는 리스트-해시strand-hast: 데이터 구조*를 쉽게 다룰 수 있는데, 이런 언어를 사용한다면 클라이언트에 데이터를 이 형태로 넘겨주는 것도 좋다.

// 다른 방법으로, 클라이언트가 데이터 구조를 요청할 때 실제 데이터를 제공해도 된다. 하지만 클라이언트가 데이터를 직접 수정하지 못하게 막을 방법이 없어서 '모든 쓰기를 함수 안에서 처리한다'는 캡슐화의 핵심 원칙이 깨지는 게 문제다. 따라서 가장 간단한 방법은 앞에서 작성한 rawData() 메서드를 사용하여 내부 데이터를 복제해서 제공하는 것이다.

// CustomerData 클라스..
class CustomerData {
	constructor(data) {
		this.data = data
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount
	}
	get rawData() {
		return _.cloneDeep(this._data)
	}
	usage(customerID, year, month) {
		return this.data[customerID].usages[year][month]
	}
	get rawData() {
		return _.cloneDeep(this._data)
	}
}

// 최상위....
function compareUsage(customerID, laterYear, month) {
	const later = getCustomerData().rawData[customerID].usages[laterYear][month]
	const earlier =
		getCustomerData().rawData[customerID].usages[laterYear - 1][month]
	return { laterAmount: later, change: later - earlier }
}

// 이 방법이 간단하지만 문제가 있다. 바로 눈에 띄는 문제는 데이터 구조가 클수록 복제 비용이 커져서 성능이 느려질 수 있다는 것이다. 하지만 다른 경우와 마찬가지로 성능 비용을 감당할 수 있는 상황일 수도 있다. 나라면 막연히 걱정만 하지 않고 얼마나 영향을 주는지 실제로 측정 해본다. 또 다른 문제는 클라이언트가 원본을 수정한다고 착각할 수 있다는 것이다. 이럴 때는 읽기전용 프락시를 제공하거나 복제본을 동결시켜서 데이터를 수정하려 할 때 에러를 던지도록 만들 수 있다.

// 두 번째 방법은 레코드 캡슐화를 재귀적으로 하는 것으로, 할 일은 늘어나지만 가장 확실하게 제어할 수 있다. 이 방법을 적용하려면 먼저 고객 정보 레코드를 클래스로 바꾸고, 컬렉션 캡슐화하기 2절로 레코드를 다루는 코드를 리팩터링해서 고객 정보를 다루는 클래스를 생성한다. 그런 다음 접근자를 이용하여 갱신을 함부로 하지 못하게 만든다. 가령 참조를 값으로 바꾸기 194절로 고객 정보를 다루는 객체를 리팩터링할 수 있다. 하지만 데이터 구조가 거대하면 일이 상당히 커진다. 게다가 그 데이터 구조를 사용할 일이 그리 많지 않다면 효과도 별로 없다. 때로는 새로 만든 클래스와 게터를 잘 혼합해서, 게터는 데이터 구조를 깊이 탐색하게 만들되 원본 데이터를 그대로 반환하지 말고 객체로 감싸서 반환하는 게 효과적일 수 있다. 이 방법은 「Refactoring Code to Load a Document*에서 자세히 다룬다.

// https://martinfowler.com/articles/refactoring-document-load.html
