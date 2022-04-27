export default function createStatementData(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result

    function playFor(aPerformance) {
      return plays[aPerformance.playID]
    }

    /* 연극 장르에 따라 계산방식이 달라지는데,
    이런 조건부 로직은 코드 수정횟수가 늘어날수록 골칫거리로 전락한다.
    이를 방지하려면 프로그래밍언어가 제공하는 구조적인 요소로 보완해야한다.
    이때 필요한게 객체지향프로그래밍의 다형성이다.

    이번 작업의 목표는 "조건부로직을 다형성으로바꾸기"로,
    상속계층을 구성해서 희극 서브클래스와 비극 서브클래스가
    각자의 구체적인 계산 로직을 정의하는것이다.

    이 리팩터링을 적용하려면 상속계층부터 정의해야한다.
    즉 공연료와 적립포인트 계산 함수를 담을 클래스가 필요하다.
    * */

    function amountFor(aPerformance) {
      let result = 0;
      switch (aPerformance.play.type) {
        case "tragedy":
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
      }
      return result
    }
    function volumeCreditsFor(aPerformance) {
      let result = 0;
      result += Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
      return result
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