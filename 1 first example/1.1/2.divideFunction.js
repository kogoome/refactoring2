import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const importJson = async (_JsonFileName) => {
  const name = _JsonFileName
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `../database/${name}.json`)
  const db = new Low(new JSONFile(file))
  await db.read()
  return db
}

const invoicesFile = await importJson('invoices')
const invoices = invoicesFile.data
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

  // 어마운트 함수
  const amountFor = (aPerformance, play) => {
    // 함수의 반환값은 항상 result를 사용
    // 변수의 역할을 쉽게 알 수 있다
    let result = 0;
  
    switch (play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`)
    }
    return result
  }

  // 변수명을 명확히 하여 인지하기 쉽게 변경
  // 변수명의 접두어에 보통 타입이름을 적는다
  // 타입이 명확하지 않을때는 a, an을 붙인다.
  for (let aPerformance of invoice.performances) {
    const play = plays[aPerformance.playID];
    let thisAmount = amountFor(aPerformance, play); // 내부함수를 사용

    // 포인트를 적립한다.
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(aPerformance.audience / 5);

    // 청구내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${aPerformance.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}\n`;
  return result;
}




const result = statement(invoices[0], plays);
console.log(result);



