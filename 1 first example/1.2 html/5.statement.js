import createStatementData from "./5.createStatementData.js";
import {invoice, plays} from "./5.controller.js";


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

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100)
  }
}

console.log(statement(invoice, plays))