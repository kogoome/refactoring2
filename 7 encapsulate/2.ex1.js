// 수업 OUT 목록을 필드로 지니고 있는 Person 클래스를 예로 살펴보자.

// - Person 끌래스....
class Person {
	constructor(name) {
		this._name = name
		this._courses = []
	}
	get name() {
		return this._name
	}
	get courses() {
		return this._courses
	}
	set courses(aList) {
		this._courses = aList
	}
}

// - Course 클래스...
class Course {
	constructor(name, isAdvanced) {
		this.name = name
		this.isAdvanced = isAdvanced
	}
	get name() {
		return this._name
	}
	get isAdvanced() {
		return this.isAdvanced
	}
}

// 클라이언트는 Person이 제공하는 수업 컬렉션에서 수업 정보를 얻는다.
const numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length

// 모든 필드가 접근자 메서드로 보호받고 있으니 안이한 개발자는 이렇게만 해도 데이터를 제대로 캡슐화했다고 생각하기 쉽다. 하지만 허점이 있다. 세터를 이용해 수업 컬렉션을 통째로 설정한 클라이언트는 누구든 이 컬렉션을 마음대로 수정할 수 있기 때문이다.

// - 클라이언트....
const basicCourseNames = readBasicCourseNames(filename)
aPerson.courses = basicCourseNames.map(name => new Course(name, false))

// 클라이언트 입장에서는 다음처럼 수업 목록을 직접 수정하는 것이 훨씬 편할 수 있다.

// 클라이언트...
for (const name of readBasicCourseNames(filename)) {
	aPerson.courses.push(new Course(name, false))
}

// 하지만 이런 식으로 목록을 갱신하면 Person 클래스가 더는 컬렉션을 제어할 수 없으니 캡슐화가 깨진다. 필드를 참조하는 과정만 캡슐화했을 뿐 필드에 담긴 내용은 캡슐화하지 않은 게 원인이다.

// 2. 제대로 캡슐화하기 위해 먼저 클라이언트가 수업을 하나씩 추가하고 제거하는 메서드를 Person에 추가해보자.

// - Person 클래스....
class Person {
	constructor(name) {
		this._name = name
		this._courses = []
	}
	get name() {
		return this._name
	}
	get courses() {
		return this._courses
	}
	set courses(aList) {
		this._courses = aList
	}

	addCourse(aCourse) {
		this._courses.push(aCourse)
	}
	removeCourse(
		aCourse,
		fnIfAbsent = () => {
			throw new RangeError()
		},
	) {
		const index = this._courses.indexOf(aCourse)
		if (index === -1) fnIfAbsent()
		else this._courses.splice(index, 1)
	}
}

// 제거 메서드에서는 클라이언트가 컬렉션에 없는 원소를 제거하려 할 때의 대응 방식을 정해야 한다. 그냥 무시하거나 에러를 던질 수도 있다. 여기서는 기본적으로 에러를 던지되, 호출자가 원하는 방식으로 처리할 여지도 남겨뒀다.

// 4. 그런 다음 컬렉션의 변경자를 직접 호출하던 코드를 모두 찾아서 방금 추가한 메서드를 사용하도록 바꾼다.

// - 클라이언트...
for (const name of readBasicCourseNames(filename)) {
	aPerson.addCourse(new Course(name, false))
}

// 2. 이렇게 개별 원소를 추가하고 제거하는 메서드를 제공하기 때문에 setCourses()를 사용할일이 없어졌으니 제거한다(세터 제거하기11,75), 세터를 제공해야 할 특별한 이유가 있다면 인수로 받은 컬렉션의 복제본을 필드에 저장하게 한다.

// - Person 클래스...
class Person {
	constructor(name) {
		this._name = name
		this._courses = []
	}
	get name() {
		return this._name
	}
	get courses() {
		return this._courses
	}
	set courses(aList) {
		this._courses = aList
	}

	addCourse(aCourse) {
		this._courses.push(aCourse)
	}
	removeCourse(
		aCourse,
		fnIfAbsent = () => {
			throw new RangeError()
		},
	) {
		const index = this._courses.indexOf(aCourse)
		if (index === -1) fnIfAbsent()
		else this._courses.splice(index, 1)
	}
	set courses(aList) {
		this._courses = aList.slice()
	}
}

// 이렇게 하면 클라이언트는 용도에 맞는 변경 메서드를 사용하도록 할 수 있다. 5. 하지만 나는이 메서드들을 사용하지 않고서는 아무도 목록을 변경할 수 없게 만드는 방식을 선호한다. 다음과 같이 복제본을 제공하면 된다.

// - Person 클래스....
class Person {
	constructor(name) {
		this._name = name
		this._courses = []
	}
	get name() {
		return this._name
	}
	get courses() {
		return this._courses
	}
	set courses(aList) {
		this._courses = aList
	}

	addCourse(aCourse) {
		this._courses.push(aCourse)
	}
	removeCourse(
		aCourse,
		fnIfAbsent = () => {
			throw new RangeError()
		},
	) {
		const index = this._courses.indexOf(aCourse)
		if (index === -1) fnIfAbsent()
		else this._courses.splice(index, 1)
	}
	set courses(aList) {
		this._courses = aList.slice()
	}
	get courses() {
		return this._courses.slice()
	}
}

// 내 경험에 따르면 컬렉션에 대해서는 어느 정도, 강박증을 갖고 불필요한 복제본을 만드는 편이, 예상치 못한 수정이 촉발한 오류를 디비깅하는 것보다 낫다. 때론 명확히 드러나지 않는 수정도 일어날 수 있다. 가령 다른 언어들은 컬렉션을 수정하는 연산들이 기본적으로 복제본을만들어 처리하지만, 자바스크립트에서는 배열을 정렬할 때 원본을 수정한다. 컬렉션 관리를 책임지는 클래스라면 항상 복제본을 제공해야 한다. 그리고 나는 컬렉션을 변경할 가능성이 있는작업을 할 때도 습관적으로 복제본을 만든다.
