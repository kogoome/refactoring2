// 지역변수에 값을 변경하거나 대입하면
// 지역변수를 쪼개서 임시변수를 작성하여 임시변수를 변경
// 1. 임시변수가 코드 안에서만 사용되면
//    변수 초기화지점과 사용지점을 붙여서(문장슬라이드하기) 처리
// 2. 임시변수가 외부에서 필요하면
//    변수에 대입된 새 값을 반환

{ // 상태변경코드 추출
  function printOwing(invoice) {
    printBanner();

    // 미해결 채무(outstanding) 계산
    let outstanding = 0; // 1. 슬라이드하여 데이터 뭉치기
    for (const o of invoice.orders) {
      outstanding += o.amount
    }// 2. 추출할 코드 복사

    recordDueDate(invoice);
    printDetails(invoice, outstanding);
  }

  function calculateOutstanding(invoice) {
    // 3. 복사한 코드 붙여넣기
    let outstanding = 0;
    for (const o of invoice.orders) {
      outstanding += o.amount
    }
    return outstanding // 4. 변경된 상태값 반환
  }
  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`)
    console.log(`채무액: ${outstanding}`)
    console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`)
  }
  function recordDueDate(invoice) {
    const today = new Date(2022, 5, 13)
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
  }
  function printBanner() {
    console.log('********************')
    console.log('***** 고객채무 *****')
    console.log('********************')
  }
}
{ // 추출한 상태변경함수 적용
  function printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice); // 추출 함수 반환값을 원래 변수에 저장
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
  }
  function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
      outstanding += o.amount
    }
    return outstanding
  }
  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`)
    console.log(`채무액: ${outstanding}`)
    console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`)
  }
  function recordDueDate(invoice) {
    const today = new Date(2022, 5, 13)
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
  }
  function printBanner() {
    console.log('********************')
    console.log('***** 고객채무 *****')
    console.log('********************')
  }
}

/*
  ## 값을 반환할 변수가 여러 개라면?

  1. 변수 각각을 반환하는 함수 여러개를 만든다.
  2. 변수들을 질의함수로 바꾸고 쪼개어 레코드로 묶어서 반환해도 된다.
  함수를 만들땐 중첩으로 만들고 나서 문맥을 옮기는것을 고려한다.
*/