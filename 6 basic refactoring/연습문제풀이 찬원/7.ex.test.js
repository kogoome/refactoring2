// 문제1. 다음 변수를 캡슐화하시오.
{
	// 이상한 변수
	let tphd = "untitled"

	// 읽는 곳
	result += <h1>${tpHd}</h1>
	// 수정하는곳
	tpHd = obj["articleTitle"]
}
{	// 풀이1 모듈패턴 사용
	{
		// 이상한 변수
		let tphd = "untitled"
		// * 모듈패턴 함수 작성
		const docData = (() => {
			// 데이터 필드
			return {
				// 리턴필드
			}
		})()

		// 읽는 곳
		result += <h1>${tpHd}</h1>
		// 수정하는곳
		tpHd = obj["articleTitle"]
	}
	{
		// 이상한 변수
		let tphd = "untitled"
		const docData = (() => {
			// * 이상한 변수 복붙
			let tphd = "untitled"
			return {
				// * 리턴함수 작성
				title: () => {
					return tphd
				},
			}
		})()
		// * 리턴 테스트
		console.log(docData.title)

		// * 통과시 반영
		result += <h1>${docData.title}</h1>
		// 수정하는곳
		tpHd = obj["articleTitle"]
	}
	{
		// 이상한 변수
		let tphd = "untitled"
		const docData = (() => {
			let tphd = "untitled"
			return {
				title: () => {
					return tphd
				},
				// * 세터 작성
				setTitle: newTitle => {
					tphd = newTitle
				},
			}
		})()
		// * 세터 테스트
		docData.setTitle("new title")
		console.log(docData.title)

		// 읽는 곳
		result += <h1>${docData.title}</h1>
		// * 테스트 통과시 적용
		docData.setTitle(obj["articleTitle"])
	}
	{
		// * 세터실행부 교체 후 삭제
		// let tphd = "untitled"
		const docData = (() => {
			let tphd = "untitled"
			return {
				title: () => {
					return tphd
				},
				// * 세터 작성
				setTitle: newTitle => {
					tphd = newTitle
				},
			}
		})()
		// * 세터 테스트
		docData.setTitle("new title")
		console.log(docData.title)

		// 읽는 곳
		result += <h1>${docData.title}</h1>
		// * 테스트 통과시 적용
		docData.setTitle(obj["articleTitle"])
	}
}
{	// 풀이2 클래스 사용
	{
		// 이상한 변수
		class DocData {
			#title = "untitled"
			constructor() {}

			get title() {
				return this.#title
			}
			set setTitle(newTitle) {
				this.#title = newTitle
			}
		}
		const docData = new DocData()
		
		// 읽는 곳
		result += <h1>${docData.title}</h1>
		// 수정하는곳
		docData.setTitle(obj["articleTitle"])
	}
}
// 문제2. 다음 이상한 변수명을 안전하게 수정하시오
{
	const cpyNm = "애크미 구스베리"
}
{ // 풀이
	const companyName = "애크미 구스베리"
	const cpyNm = companyName
}