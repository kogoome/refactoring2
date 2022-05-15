// * 매개변수 추가하기

// 도서 관리 프로그램의 Book 클래스에 예약 기능이 구현되어 있다고 하자.

class Book {
  addReservation(customer) { this._reservations.push(customer) }
}

// 그런데 예약 시 우선순위 큐를 지원하라는 새로운 요구가 추가되었다. 그래서 addReservation()을 호출할 때 예약 정보를 일반 큐에 넣을지. 우선순위 큐에 넣을지를 지정하는 매개변수를 추가하려 한다. addReservation()을 호출하는 곳을 모두 찾고 고치기가 쉽다면 곧바로 변경하면 된다. 그렇지 않다면 마이그레이션 절차대로 진행해야 한다. 여기서는 후자의 경우라고 가정해보자.

// 절차(2) 먼저 addReservation()의 본문을 새로운 함수로 추출한다. 새로 추출한 함수 이름도addReservation()이어야 하지만, 기존 함수와 이름이 같은 상태로 둘 수는 없으니 우선은 나중에 찾기 쉬운 임시 이름을 붙인다.

class Book {
  addReservation(customer) { this.zz_addReservation(customer); } zz_addReservation(customer) { this._reservations.push(customer); }
}

// 절차(3) 그런 다음 새 함수의 선언문과 호출문에 원하는 매개변수를 추가한다 (이 작업은 간단한 절차로 진행한다).

class Book {
  addReservation(customer) { this.zz_addReservation(customer, false) }
  zz_addReservation(customer, isPriority) { 
    this._reservations.push(customer); 
  }
}

// 나는 자바스크립트로 프로그래밍한다면, 호출문을 변경하기 전에 어서션을 추가(10.6)하여 호출하는 곳에서 새로 추가한 매개변수를 실제로 사용하는지 확인한다.

class Book {
  zz_addReservation(customer, isPriority) { 
    assert(isPriority = true || isPriority === false); 
    this._reservations.push(customer); 
  }
}

// 이렇게 해두면 호출문을 수정하는 과정에서 실수로 새 매개변수를 빠뜨린 부분을 찾는 데 도움된다. 오랜 세월 나보다 실수를 많이 하는 프로그래머를 거의 못 봤기 때문이기도 하다.

// 절차(5) 이제 기존 함수를 인라인(6.2)하여 호출 코드들이 새 함수를 이용하도록 고친다. 호출문은 한번에 하나씩 변경한다.

// 절차(6) 다 고쳤다면 새 함수의 이름을 기존 함수의 이름으로 바꾼다.

// 이상의 작업은 대부분 간단한 절차만으로도 무리가 없지만, 필요하면 마이그레이션 절차를 따르기도 한다.
