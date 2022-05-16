class Person {
	constructor(private firstName: string, private lastName: string) {}

	getName() {
		return { firstName: this.firstName, lastName: this.lastName }
	}
	setName(firstName: string, lastName: string) {
		this.firstName = firstName
		this.lastName = lastName
	}
}

const p1 = new Person("마크", "파울러")
console.log(p1)
//p1 :>>  Person { firstName: '마크', lastName: '파울러' }
console.log(p1.getName()) // { firstName: '마크', lastName: '파울러' }
const mark = p1.getName()
mark.firstName = "마크2"
console.log(p1.getName()) // { firstName: '마크', lastName: '파울러' }
