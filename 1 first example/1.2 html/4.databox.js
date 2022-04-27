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

// 데이터처리
function createStatementData(invoice, plays) {
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
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
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
  function totalAmount(data) {
    // let result = 0;
    // for (let aPerformance of data.performances) {
    //   result += aPerformance.amount;
    // }
    // return result
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
  function totalVolumeCredits(data) {
    // 반복문을 파이프라인으로 바꿈
    /*let result = 0;
    for (let aPerformance of data.performances) {
      result += aPerformance.volumeCredits
    }
    return result*/
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
  return statementData;
}
// 메인함수
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}
// 출력문장
function renderPlainText(data) {
  let result = `청구내역(고객명: ${data.customer}) \n`
  result+=data.performances.reduce((str, p)=>
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



