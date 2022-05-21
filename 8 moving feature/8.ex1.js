// 회사의 지점 사무실 정보를 csv 형태로 정리
const office = `office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Bangalore, India, +91 80 4064 9570
Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 660 44766`
// 인도에 자리한 사무실을 찾아서 도시명과 전화번호를 반환
function acquireData(input) {
	const lines = input.split('\n')
	let firstLine = true
	const result = []
	// ! 반복문을 컬렉션 파이프라인으로 바꿔보자.
	for (const line of lines) {
		if (firstLine) {
			firstLine = false
			continue
		}
		if (line.trim() === '') continue
		const record = line.split(',')
		if (record[1].trim() === 'India') {
			result.push({ city: record[0].trim(), phone: record[2].trim() })
		}
	}
	return result
}

console.log(acquireData(office))
// [ { city: 'Bangalore', phone: '+91 80 4064 9570' },
//   { city: 'Chennai', phone: '+91 44 660 44766' } ]

// todo 1. 반복문에 사용할 컬렉션 변수 생성
// 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
		let firstLine = true
		const result = []
		// 컬렉션변수(루프변수)생성, 대체
		const loopItems = lines
		for (const line of loopItems) {
			if (firstLine) {
				firstLine = false
				continue
			}
			if (line.trim() === '') continue
			const record = line.split(',')
			if (record[1].trim() === 'India') {
				result.push({ city: record[0].trim(), phone: record[2].trim() })
			}
		}
		return result
	}
}
// todo 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
		// let firstLine = true
		const result = []
		const loopItems = lines.slice(1) // 반영
		for (const line of loopItems) {
			// 첫줄(office, country, telephone) 제거 => slice로 대체
			// if (firstLine) {
			// 	firstLine = false
			// 	continue
			// }
			// todo 빈줄지우기 => filter로 대체
			if (line.trim() === '') continue
			const record = line.split(',')
			if (record[1].trim() === 'India') {
				result.push({ city: record[0].trim(), phone: record[2].trim() })
			}
		}
		return result
	}
}
// todo 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
		const result = []
		const loopItems = lines.slice(1).filter((line) => line.trim() !== '') // 반영
		for (const line of loopItems) {
			// 빈줄지우기 => filter로 대체
			// if (line.trim() === '') continue
			// todo map으로 변환
			const record = line.split(',')
			if (record[1].trim() === 'India') {
				result.push({ city: record[0].trim(), phone: record[2].trim() })
			}
		}
		return result
	}
}
// todo 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
		const result = []
		const loopItems = lines
			.slice(1)
			.filter((line) => line.trim() !== '')
			.map((line) => line.split(',')) // 파이프라인 종료는 세미콜론이 좋다
		for (const line of loopItems) {
			// map으로 변환
			// const record = line.split(',')
			// todo 정제 로직은 filter를 사용
			if (record[1].trim() === 'India') {
				result.push({ city: record[0].trim(), phone: record[2].trim() })
			}
		}
		return result
	}
}
// todo 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
		const result = []
		const loopItems = lines
			.slice(1)
			.filter((line) => line.trim() !== '')
			.map((line) => line.split(','))
			.filter((record) => record[1].trim() === 'India')
      ; // 반영
		for (const line of loopItems) {
			// 정제 로직은 filter를 사용
			// if (record[1].trim() === 'India') {
      // todo 배열 정리는 map으로 처리
			result.push({ city: record[0].trim(), phone: record[2].trim() })
			// }
		}
		return result
	}
}
// todo 2. 반복문의 첫 줄부터 각각의 단위 행위를 컬렉션 파이프라인 연산으로 대체. 테스트
// todo 3. 모든 동작 대체시 반복문 제거
{
	function acquireData(input) {
		const lines = input.split('\n')
    // const result = []
		const loopItems = lines
			.slice(1)
			.filter((line) => line.trim() !== '')
			.map((line) => line.split(','))
			.filter((record) => record[1].trim() === 'India')
      .map(record=> ({ city: record[0].trim(), phone:record[2].trim() }))
      ; // 반영
		for (const line of loopItems) {
			// 정제 로직은 filter를 사용
			// if (record[1].trim() === 'India') {
      // 배열 정리는 map으로 처리
			// result.push({ city: record[0].trim(), phone: record[2].trim() })
			// }
		}
		return loopItems// 파이프라인 리턴 배열값 반영
	}
}
{
	function acquireData(input) {
		const lines = input.split('\n')
		return lines // 인라인
			.slice(1)
			.filter((line) => line.trim() !== '')
			.map((line) => line.split(','))
			.filter((record) => record[1].trim() === 'India')
      .map(record=> ({ city: record[0].trim(), phone:record[2].trim() }))
  }
}
