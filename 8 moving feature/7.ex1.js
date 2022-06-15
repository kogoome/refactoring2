// 테스트용 임시 데이터
function createPerson(n) {
	return { age: n, salary: n * 10 * 12 }
}
const people = [21, 22, 23, 24, 25, 26, 27, 28, 29].map((n) => createPerson(n))

// 전체 급여와 가장 어린 나이를 계산하는 코드를 보자.
{
	function ex1(people) {
		let youngest = people[0] ? people[0].age : Infinity
		let totalSalary = 0
		for (const p of people) {
			// ! 반복문 내용 쪼개기
			if (p.age < youngest) youngest = p.age
			totalSalary += p.salary
		}
		return `최연소 : ${youngest}, 총 급여: ${totalSalary}`
	}
}
// todo 1. 반복문을 복제해 두 개로 만든다.
// todo 2. 반복문이 중복시 부수효과를 파악 제거
// todo 3. 테스트
// 4. 각 반복문 함수로 추출 여부 고려
{
	function ex1(people) {
		let youngest = people[0] ? people[0].age : Infinity
		let totalSalary = 0
		for (const p of people) {
			if (p.age < youngest) youngest = p.age
			// totalSalary += p.salary
		}		
		for (const p of people) {
			// if (p.age < youngest) youngest = p.age
			totalSalary += p.salary
		}

		return `최연소 : ${youngest}, 총 급여: ${totalSalary}`
	}
	console.log(ex1(people)) // 최연소 : 21, 총 급여: 27000
}
// todo 4. 각 반복문 함수로 추출 여부 고려
{
	function ex1(people) {
		// todo 응집력 올리기
		// 젋은 사람 찾기
		let youngest = people[0] ? people[0].age : Infinity
		for (const p of people) {
			if (p.age < youngest) youngest = p.age
		}
		// 총 급여 계산
		let totalSalary = 0
		for (const p of people) {
			totalSalary += p.salary
		}
		return `최연소 : ${youngest}, 총 급여: ${totalSalary}`
	}
}
{
	function ex1(people) {
		// todo 함수로 변환, 테스팅
		function youngestAge(people) {
			let youngest = people[0] ? people[0].age : Infinity
			for (const p of people) {
				if (p.age < youngest) youngest = p.age
			}
			return youngest
		}

		function totalSalary(people) {
			let totalSalary = 0
			for (const p of people) {
				totalSalary += p.salary
			}
			return totalSalary
		}

		return `최연소 : ${youngestAge(people)}, 총 급여: ${totalSalary(people)}`
	}
	console.log(ex1(people)) // 최연소 : 21, 총 급여: 27000
}
{
	function ex1(people) {
		// todo for -> 변환
		function youngestAge(people) {
			return Math.min(...people.map((person) => person.age))
		}

		function totalSalary(people) {
			return people.reduce(
				(totalSalary, person) => totalSalary + person.salary,
				0
			)
		}

		return `최연소 : ${youngestAge()}, 총 급여: ${totalSalary()}`
	}
	console.log(ex1(people)) // 최연소 : 21, 총 급여: 27000
}

