function printOwing(invoice) {
  let outstanding = 0
  // 1. 배너추출
  printBanner();

  // 미해결 채무(outstanding) 계산
  for (const o of invoice.orders) {
    outstanding += o.amount
  }

  // 마감일 (dueDate) 기록
  const today = new Date(2022,5,13,12,0)
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // 2. 세부 사항 추출
  printDetails();

  // 함수 내 변수를 사용, 중첩추출
  function printDetails() {
    console.log(`고객명: ${invoice.customer}`)
    console.log(`채무액: ${outstanding}`)
    console.log(`마감일: ${invoice.dueDate.toLocaleString()}`)
  }
}
// 사용변수 없음. 글로벌 추출
function printBanner() {
  console.log('********************')
  console.log('***** 고객채무 *****')
  console.log('********************')
}
// 테스트
printOwing({
  customer: '재남',
  orders: [
    { name: '사채', amount: 100 },
    { name: '대출', amount: 1000 },
  ],
})