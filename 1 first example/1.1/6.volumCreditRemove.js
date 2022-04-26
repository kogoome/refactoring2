import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const importJson = async (_JsonFileName) => {
  const name = _JsonFileName
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `${name}.json`)
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
  let result = `청구내역(고객명: ${invoice.customer}) \n`

  for (let aPerformance of invoice.performances) {
    result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance))} (${aPerformance.audience}석)\n`;
    totalAmount += amountFor(aPerformance);;
  }
  // 4. 로직을 함수로 추출
  // let volumeCredits = totalVolumeCredits()

  result += `총액: ${usd(totalAmount)}\n`;
  // 5. 인라인에 삽입
  result += `적립포인트: ${totalVolumeCredits()} 점\n`;
  return result;

  // 3. 함수작성으로 모듈화
  function totalVolumeCredits() {
    // 0. 이번에 제거할 대상
    let result = 0;
    // 1. for 문 안에서 누적사용되고있기 때문에 별도의 for문으로 분리
    // 반복문을 사용하는게 성능저하때문에 꺼려질 수 있는데, 사실 큰 영향을 미치지는 못한다.
    // 만약 성능상에 문제가 있다고 해도, 일단 리팩토링을 마친 후 성능을 개선하는게 더 효과적이다.
    // 2. for 문 변수 앞뒤로 옮기기
    for (let aPerformance of invoice.performances) {
      result += volumeCreditsFor(aPerformance)
    }
    return result
  }

  // 분리된 함수들
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




const result = statement(invoice, plays);
console.log(result);



