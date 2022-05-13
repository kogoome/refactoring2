// 리팩토링할 코드
const printOwing = invoice => {
  let outstanding = 0

  // 배너 출력
  console.log('********************')
  console.log('***** 고객채무 *****')
  console.log('********************')

  // 미해결 채무(outstanding) 계산
  for (const o of invoice.orders) {
    outstanding += o.amount
  }

  // 마감일 (dueDate) 기록
  const today = Clock.today
  // Clock.today는 내가 Clock Wrapper* 라고 부르는 것으로, 시스템 시계를 감싸는 객체다. 나는 Date.now()처럼 시스템 시간을 알려주는 함수는 직접 호출하지 않는다. 직접 호출하면 테스트할 때마다 결과가 달라져서 오류 상황을 재현하기가 어렵기 때문이다.
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // 세부 사항을 출력
  console.log(`고객명: ${invoice.customer}`)
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invoice.dueDate.toLocaleString()}`)
}

// 테스트
printOwing({
  customer: '재남',
  orders: [
    { name: '사채', amount: 100 },
    { name: '대출', amount: 1000 },
  ],
})