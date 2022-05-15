class ExCapsule {
  #id
  name // 형식상 표기, 자바스크립트에서는 표기 안해도 무방
  constructor(name) {
    this.name = name
    this.#id = 1
  }

  get id() { return this.#id }
  #console() { console.log("print console") }
  getConsole() { this.#console() }
}

const one = new ExCapsule("hello")
console.log(one) // ExCapsule { name: 'hello' }
one.name = "world"
console.log(one) // ExCapsule { name: 'world' }
console.log(one.id) // 1
// console.log(one.#id) 
//Private field '#id' must be declared in an enclosing class
try {
  one.console() // ide 밑줄
} catch (e) { console.log(e) /* TypeError: one.console is not a function*/ }
one.getConsole() // print console
