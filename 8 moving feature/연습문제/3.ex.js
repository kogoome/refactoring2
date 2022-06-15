// 문제 반복되는 코드를 emitPhotoData() 함수로 안전하게 옮기시오.
function renderPerson(outStream, person) {
	const result = []
	result.push(`<p>${person.name}</p>`)
	result.push(renderPhoto(person.photo))
	result.push(`<p>title: ${person.photo.title}</p>`) // ! 반복코드
	result.push(emitPhotoData(person.photo)) // 호출
	return result.join('\n')
}
function photoDiv(p) {
	return [
		`<div>`,
		`<p>title: ${p.title}</p>`, // ! 반복코드
		emitPhotoData(p), // 호출
		`</div>`,
	].join(`\n`)
}
function emitPhotoData(aPhoto) {
	const result = []
	result.push(`<p>location: ${aPhoto.location}</p>`)
	result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
	return result.join(`\n`)
}

// 1. 반복 코드를 함수 호출 부분으로 모으기 (문장 슬라이드하기)
// 2. 호출자가 하나면, 해당 코드를 잘라내어 피호출 함수로 복사 테스트. 종료
// 3. 호출자가 둘 이상이면, 호출자 중 하나에서 다른 함수로 추출.
// 4. 다른 호출자에서 추출한 함수를 사용 수정. 테스트
// 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래함수를 제거
// 6. 함수 이름 복구.
