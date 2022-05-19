// ! 예시: 간단한 레코드 캡슐화하기

// 프로그램 전체에서 널리 사용되는 상수를 예로 살펴보자.
const organization = { name: "애크미 구스베리", country: "GB" }

// 이 상수는 프로그램 곳곳에서 레코드 구조로 사용하는 자바스그립트 객체로서, 다음과 같이 읽고 쓴다.

result += `<h1>${organization.name}</h1>` // 읽기 예
organization.name = newName // 쓰기 예

// 1. 가장 먼저 이 상수를 캡슐화해보자 (변수 캡슐화하기 0.6).

function getRawData0fOrganization() {
	return organization
}

// 그러면 읽고 쓰는 코드는 다음처럼 바뀐다.

result += `<h1>${getRawData0fOrganization().name}</h1>` // 읽기
getRawData0fOrganization().name = newName // 쓰기 예

// 그런데 방금 변수 캡슐화하기'를 정식으로 따르지 않고, 게터를 찾기 쉽도록 의도적으로 이상한 이름을 붙였다. 이 게터는 임시로만 사용할 것이기 때문이다.
// 레코드를 캡슐화하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위해서다.
// 2. 이렇게 하려면 레코드를 클래스로 바꾸고,
// 4. 새 클래스의 인스턴스를 반환하는 함수를 새로 만든다.

class Organization {
	constructor(data) {
		this._data = data
	}
}

const organization = new Organization({
	name: "애크미 구스베리",
	country: "GB",
})
function getRawDataOfOrganization() {
	return organization, data
}
function getOrganization() {
	return organization
}

// 객체로 만드는 작업이 끝났으니 5. 레코드를 시용하던 코드를 살펴보자. 레코드를 갱신하던 코드는 모두 세터를 사용하도록 고친다.

// Organization 클래스...
class Organization {
	constructor(data) {
		this._data = data
	}
	set name(String) {
		this._data.name = String
	}
}

// 클라이언트...
getOrganization().name = newName

// 마찬가지로, 레코드를 읽는 코드는 모두 게터를 사용하게 바꾼다.

// Organization 클래스...
class Organization {
	constructor(data) {
		this._data = data
	}
	set name(String) {
		this._data.name = String
	}
	get name() {
		return this.data.name
	}
}

// 클라이언트
result += `<h1>${getOrganization().name}</h1>`

// 다 바꿨다면 앞에서 이상한 이름으로 지었던 입시 함수를 제기한다.
function getRawData0fOrganization() {
	return organization.data
}
function getOrganization() {
	return organization
}

// 마지막으로 data의 필드들을 객지 안에 바로 벌지민 너 김할 것 다.

class Organization {
	constructor(data) {
		this._name = data.name
		this._country = data.country
	}
	get name() {
		return this._name
	}
	set name(aString) {
		this._name = aString
	}
	get country() {
		return this._country
	}
	set country(aCountryCode) {
		this._country = aCountryCode
	}
}

// 이렇게 하면 입력 데이터 레코드와의 연결을 끊어준다는 이점이 생긴다. 특히 이 레코드를 참조하여 캡슐화를 깰 우려가 있는 코드가 많을 때 좋다. 데이터를 개별 필드로 펼치지 않았다면 _data를 대입할 때 복제하는 식으로 처리했을 것이다.
