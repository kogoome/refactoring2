/*
* 3. 클레스에 로직을 담고 이제 다형성을 지원하게 만들어보자.
* 먼저 할 일은 "타입코드 대신 서브클래스를 사용"하도록 변경하는 것이다.
* 잘 맞는 서브클래스를 사용하려면 생성자 대신 함수를 호출하도록 바꿔야 한다.
* 자바스크립트에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문이다.
* 그래서 "생성자를 팩터리 함수로 바꾸기"를 적용한다.
* */

// 1-1. 계산기 클래스, 목표는 어마운트 볼륨크레딧을 가져오는 것.
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }
  // 1-2. amountFor 함수 옮겨오고 필드값으로 변수 대체
  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`)
    }
    return result
  }
  // 2-1. volumeCreditsFor 함수 옮겨오고 변수 변경 이하 같은작업
  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
    return result
  }
}

export default function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  function enrichPerformance(aPerformance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    // 1-4. 이상이 없다면 함수를 클래스 메서드로 대체, 작동확인이 되면 함수제거
    // result.amount = amountFor(result)
    result.amount = calculator.amount
    // 2-3. 객체메서드로 인라인 삽입. 테스트 이상없으면 함수 제거
    result.volumeCredits = calculator.volumeCredits
    return result

    function playFor(aPerformance) {
      return plays[aPerformance.playID]
    }
    // 1-3. 내용 대체, 실행하여 이상없는지 확인
    // 1-5. 함수제거
    // function amountFor(aPerformance) {
    //   return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount
    // }

    // 2-2. 내용 옮겨가고 객체 생성해서 테스트. 이상없으면 2-3으로
    // 2-4. 함수제거
    // function volumeCreditsFor(aPerformance) {
    //   return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits
    // }
  }
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
  return statementData;
}