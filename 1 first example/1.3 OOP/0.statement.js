import createStatementData from "./0.createStatementData.problemRecognition.js";
import {invoice, plays} from "./0.controller.js";
/*
* 초기 코드에 비해 라인 수는 배는 늘어났지만
* 전체 로직을 구성하는 요소 각각이 더 뚜렷이 부각되고
* 계산하는 부분과 출력형식을 다루는 부분이 분리됐다.
* 모듈화가 잘 진행되면 각 부분들이 맞물려 돌아가는 과정을 파악하기 쉽다.
* 프로그래밍에선 명료함이 소프트웨어 진화의 정수다.
* */


function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `청구내역(고객명: ${data.customer}) \n`
  result += data.performances.reduce((str, p)=>
    str +` ${p.play.name}: ${usd(p.amount)} (${p.audience}석)\n`,""
  )
  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립포인트: ${data.totalVolumeCredits} 점\n`
  return result;
}

function renderHtml(data) {
  let result = `<h1> 청구내역(고객명: ${data.customer}) </h1>\n`
  result += `<table>\n`
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>`
  result += data.performances.reduce((str, p)=>
    str +`<tr><td>${p.play.name}</td><td>(${p.audience}석)</td><td>${usd(p.amount)}</td></tr>\n`,""
  )
  result += `</table>\n`
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`
  result += `<p>적립포인트: <em>${data.totalVolumeCredits}</em> 점</p>\n`
  return result;
}
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100)
}

console.log(statement(invoice, plays))