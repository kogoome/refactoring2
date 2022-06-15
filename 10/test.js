class A {
  constructor(x) {
    this.x = x;
  }

  getX() {
    return this.x;
  }
}

class B {
	constructor(x) {
		this.x = x
	}

	getX() {
		return this.x
	}
}

let a = new A
let b = new B

console.log(typeof a);
console.log(typeof b);
