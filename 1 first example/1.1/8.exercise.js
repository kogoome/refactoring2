// 1번 파일을 가져와서 설명을 보지 않고 7번 상태를 만들것.

// 로우디비사용
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
// 제이슨 임포트
async function importJson(_JsonFileName) {
  const name = _JsonFileName
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `../database/${name}.json`)
  const db = new Low(new JSONFile(file))
  await db.read()
  return db
}
// 청구서 함수
function statement(invoice, plays) {
  let result = `청구내역(고객명: ${invoice.customer}) \n`
  for (let aPerformance of invoice.performances) {
    result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance) / 100)} (${aPerformance.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())} 점\n`;
  result += `적립포인트: ${totalVolumeCredits()}\n`;
  return result;

  function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount / 100;
  }
  function totalVolumeCredits() {
    let result = 0
    for (let perf of invoice.performances) {
      result += volumeCreditFor(perf);
    }
    return result;
  }
  function volumeCreditFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber);
  }
  function amountFor(aPerformance) {
    let result = 0
    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case "comedy": // 희극
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }
}

// 제이슨 파일 읽어오기
const invoicesFile = await importJson ('invoices')
const invoices = invoicesFile.data
const playsFile = await importJson ('plays')
const plays = playsFile .data
// 청구서 발행
const result = statement(invoices[0], plays);
// 출력
console.log(result);




