import createStatementData from "./2.createStatementData.polymolphism.js";
import {invoice, plays} from "./0.api.js";

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