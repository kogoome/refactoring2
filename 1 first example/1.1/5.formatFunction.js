import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const importJson = async (_JsonFileName) => {
  const name = _JsonFileName
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `../data/${name}.json`)
  const db = new Low(new JSONFile(file))
  await db.read()
  return db
}

const invoicesFile = await importJson('invoices')
const invoices = invoicesFile.data
const invoice = invoices[0]
const playsFile = await importJson('plays')
const plays = playsFile.data


// 청구서 함수
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역(고객명: ${invoice.customer}) \n`

  // format을 함수로 변경해서 사용하면 직관적으로 인지하기 쉽다.
  // 그러나 함수명이 직관적이지 않으니, 용도를 고려하여 변경하는 것이 좋다.
  // function format(aNumber) {
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100)// 단위 변환로직도 이동
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result
  }

  for (let aPerformance of invoice.performances) {
    volumeCredits += volumeCreditsFor(aPerformance)
    result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance))} (${aPerformance.audience}석)\n`;
    totalAmount += amountFor(aPerformance);;
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립포인트: ${volumeCredits}\n`;
  return result;
}




const result = statement(invoice, plays);
console.log(result);



