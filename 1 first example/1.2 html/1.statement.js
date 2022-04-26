import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

async function importJson(_JsonFileName) {
  const name = _JsonFileName
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `../data/${name}.json`)
  const db = new Low(new JSONFile(file))
  await db.read()
  return db
}

// 계산관련 코드
function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances
  return renderPlainText(statementData, plays)
}

// 데이터만 처리, invoice 변수를 제거했다.
function renderPlainText(data, plays) {
  let result = `청구내역(고객명: ${data.customer}) \n`
  for (let aPerformance of data.performances) {
    result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance))} (${aPerformance.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립포인트: ${totalVolumeCredits()} 점\n`;
  return result;

  // 같은 방식으로 리팩토링
  // 난무하는 중첩함수
  function totalAmount() {
    let result = 0;
    for (let aPerformance of invoice.performances) {
      result += amountFor(aPerformance);
    }
    return result
  }
  function totalVolumeCredits() {
    let result = 0;
    for (let aPerformance of invoice.performances) {
      result += volumeCreditsFor(aPerformance)
    }
    return result
  }
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
}


// 디비 가져오기
const invoicesFile = await importJson('invoices')
const invoices = invoicesFile.data
const invoice = invoices[0]
const playsFile = await importJson('plays')
const plays = playsFile.data
// 청구내역
const result = statement(invoice, plays);
// 출력
console.log(result);



