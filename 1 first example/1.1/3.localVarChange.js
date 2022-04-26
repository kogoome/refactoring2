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
  let volumeCredits = 0;
  let result = `청구내역(고객명: ${invoice.customer}) \n`

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  // play매개변수 불필요 삭제
  // 지역변수를 제거하면 추출작업이 쉬워진다.
  // 신경써야 할 유효범위가 줄어들기 때문
  const amountFor = (aPerformance) => {
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

  const playFor = (aPerformance) => {
    return plays[aPerformance.playID]
  }

  for (let aPerformance of invoice.performances) {
    // play라는 변수는 aPerformance에서 추출되었으므로
    // 같은 데이터를 변환하여 사용된것이다. 때문에 함수로 빼고 변수를 제거
    // const play = playFor(aPerformance);

    // 마찬가지로 thisAmount 또한 인라인으로 적용 가능하다.
    // let thisAmount = amountFor(aPerformance, play);

    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // play변수 인라인 함수로 대체
    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    // play변수 인라인 함수로 대체, thisAmount변수 인라인 함수로 대체
    result += ` ${playFor(aPerformance).name}: ${format(amountFor(aPerformance) / 100)} (${aPerformance.audience}석)\n`;
    totalAmount += amountFor(aPerformance);;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}\n`;
  return result;
}




const result = statement(invoice, plays);
console.log(result);



