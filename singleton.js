class Singleton {
  static #instance
  constructor() {
    if(Singleton.#instance) {
      console.log("two")
      return Singleton.#instance
    }
    this.id = 1
    this.text = "hello"
    Singleton.#instance = this
  }
}

const one  = new Singleton()
const two  = new Singleton()
console.log(one===two) // true
console.log(one.instance) // undefined
// 인스턴스 호출도 이뤄지지 않는다.

