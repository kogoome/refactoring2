class ExSingleton {
  static #instance
  constructor() {
    if(ExSingleton.#instance) {
      console.log("two")
      return ExSingleton.#instance
    }
    this.id = 1
    this.text = "hello"
    ExSingleton.#instance = this
  }
}

const one  = new ExSingleton()
const two  = new ExSingleton()
console.log(one===two) // true
console.log(one.instance) // undefined
// 인스턴스 호출도 이뤄지지 않는다.

