class Capsule {
  #id
  name // 형식상 표기, 자바스크립트에서는 표기 안해도 무방
  constructor(name) {
    this.name = name
    this.#id = 1
  }

  get id(){return this.#id}
  #console(){console.log("print console")}
  getConsole() {this.#console()}
}

const one = new Capsule("hello")
console.log(one) // Capsule { name: 'hello' }
one.name = "world"
console.log(one) // Capsule { name: 'world' }
console.log(one.id) // 1
try {one.console() // ide 밑줄
} catch (e) {console.log(e) /* TypeError: one.console is not a function*/}
one.getConsole() // print console
