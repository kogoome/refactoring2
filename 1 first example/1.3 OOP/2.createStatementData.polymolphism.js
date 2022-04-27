/*
* 1. 서브클래스를 만들고 생성자 대신 팩토리 함수를 사용한다.
* 2. 다형성을 활용해 amount 메서드를 오버라이드한다.
* 3. 마찬가지 방법으로 volumeCredits 메서드도 오버라이딩한다.
* */
/**
 * 구조를 보강하면서 코드가 늘어났다.
 * 이번 수정으로 나아진점은 연극타입에 따라 계산코드를 묶어놨기 때문에 명확하게 분리가 되었다.
 * 이제 새로운 장르를 추가하려면 해당 장르의 서브클래스를 작성하고
 * 타입에 따른 생성자를 생성함수에 추가하면 된다.
 *
 * 이처럼 서브클래스는 조건부 로직을 생성함수 하나로 옮기게 해준다.
 * 같은타입의 다형성을 기반으로 실행되는 함수가 많을수록 이렇게 구성하는 쪽이 유리하다.
 *
 * 자바스크립트 클래스는 겟메서드 사용에 있어 객체의 속성을 불러올때와 똑같이 사용할 수 있다는 점이 멋지다.
 *
 * 함수 추출하기, 변수 인라인하기, 함수 옮기기, 조건부로직을 다형성으로 바꾸기 등의 리팩터링 기법을 사용해보았다.
 * 리팩터링은 코드가 하는 일을 파악하는데서 시작하고, 개선점을 찾고, 리팩터링 작업을 통해 코드에 반영하는 식으로 진행한다.
 * 그 결과 코드가 명확해지고 이해하기 더 쉬워진다. 그러면 또 다른 개선점이 떠오르며 선순환이 형성된다.
 * 좋은 코드란, "얼마나 수정하기 쉬운 코드인지"가 중요하다.
 **/


class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }
  get amount() {
    // 2-3. 메서드가 오버라이딩 되었으니 이 과정은 삭제처리하고, 실행시 에러를 던진다.
    // 메서드 전체를 삭제해도 무방하다.
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.')
    // let result = 0;
    // switch (this.play.type) {
    //   case "tragedy":
    //     result = 40000;
    //     if (this.performance.audience > 30) {
    //       result += 1000 * (this.performance.audience - 30);
    //     }
    //     break;
    //   case "comedy":
    //     result = 30000;
    //     if (this.performance.audience > 20) {
    //       result += 10000 + 500 * (this.performance.audience - 20);
    //     }
    //     result += 300 * this.performance.audience;
    //     break;
    //   default:
    //     throw new Error(`알 수 없는 장르: ${this.play.type}`)
    // }
    // return result
  }
  // 3-1. 공통로직과 특수로직을 분리하고 특수케이스를 오버라이딩한다.
  get volumeCredits() {
    // let result = 0;
    // result += Math.max(this.performance.audience - 30, 0);
    // 3-3. 특수 케이스 - 오버라이드 대상, 서브클래스로 옮겨서 사용
    // if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
    // return result

    // 3-2. 공통로직만 남기고 원래내용은 삭제
    return Math.max(this.performance.audience - 30, 0);
  }
}
// 1-3. 공연 타입별 서브클래스 작성
class TragedyCalculator extends PerformanceCalculator {
  // 2-1. 메서드 오버라이드
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result
  }
}
class ComedyCalculator extends PerformanceCalculator {
  // 2-2. 메서드 오버라이드
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result
  }
  // 3-2. 메서드 오버라이드
  get volumeCredits() {
    // 3-4. 특수케이스를 추가적용한다.
    return super.volumeCredits + Math.floor(this.performance.audience / 5)
  }
}


// 1-1. 생성자를 대신할 팩터리 함수 - 생성함수 작성
function createPerformanceCalculator(aPerformance, aPlay) {
  // return new PerformanceCalculator(aPerformance, aPlay)
  // 1-4. 팩터리 함수를 이용하면 서브클래스 중 어느것을 생성해서 반환할지 선택 가능하다.
  switch (aPlay.type) {
    case "tragedy" : return new TragedyCalculator(aPerformance, aPlay)
    case "comedy" : return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
}

export default function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  function enrichPerformance(aPerformance) {
    // 1-2. 생성자 대신 팩터리 함수 이용
    // const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance))
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    // 2-3. 코드는 변하지 않았지만 메서드는 서브클래스에 따라 달리 사용된다.
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result

    function playFor(aPerformance) {
      return plays[aPerformance.playID]
    }
  }
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
  return statementData;
}