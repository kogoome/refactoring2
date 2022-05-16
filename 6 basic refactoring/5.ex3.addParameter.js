/* 
! 함수 이름 바꾸기 -매개변수 추가하기
1. 본문을 적절히 리팩터링
2. 본문을 함수로 추출, 만약 같은이름이 있다면 임시이름 사용
3. 추출한 함수에 매개변수를 추가시 '간단한 절차'를 따라 추가
4. 테스트
5. 기존 함수를 인라인
6. 임시이름을 되돌림
7. 테스트
*/


class Book { // 도서관리 프로그램
  // 예약기능
  addReservation(customer) { this._reservations.push(customer) }
}
// * 우선예약큐 요구사항 추가
// * 예약 함수 호출시 일반큐 우선예약큐 지정매개변수 추가할 것
// * 예약함수를 호출하는 곳을 모두 찾고 고치기가 어려움. -> 마이그레이션 절차로 진행

class Book {
  addReservation(customer) { this.zz_addReservation(customer); } 
  // * 2. 함수 본문 전체 추출, 임시변수 사용
  zz_addReservation(customer) { this._reservations.push(customer); }
}

class Book {
  zz_addReservation(customer, isPriority) { // * 3. 우선예약 매개변수 추가
    this._reservations.push(customer); 
  }
  // * 일반예약 인수 사용
  addReservation(customer) { this.zz_addReservation(customer, false) }
}

class Book {
	zz_addReservation(customer, isPriority) {
    // TODO 어설션 추가(10.6)해 매개변수를 사용하는지 확인
		assert(isPriority === true || isPriority === false) // * 매개변수사용확인
		this._reservations.push(customer)
	}
	addReservation(customer) { this.zz_addReservation(customer, false) }
}

class Book {
	zz_addReservation(customer, isPriority) {
		assert(isPriority === true || isPriority === false)
		this._reservations.push(customer)
	}
	addReservation(customer) {
		this.zz_addReservation(customer, false)
	}
}
// * 5. 기존 함수를 인라인(6.2)하여 호출 코드들이 새 함수를 이용하도록 수정, 기존함수 삭제
// * 6. 새 함수의 이름을 복구
