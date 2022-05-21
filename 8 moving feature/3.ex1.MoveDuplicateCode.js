// ! 반복되는 코드를 emitPhotoData() 함수로 안전하게 옮기자.
{
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
}

// todo 1. 반복 코드를 함수 호출 부분으로 모으기 (문장 슬라이드하기)
// 2. 호출자가 하나면, 해당 코드를 잘라내어 피호출 함수로 복사 테스트. 종료
// todo 3. 호출자가 둘 이상이면, 호출자 중 하나에서 다른 함수로 추출.
// 4. 다른 호출자에서 추출한 함수를 사용 수정. 테스트
// 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래함수를 제거
// 6. 함수 이름 복구.
{
	function renderPerson(outStream, person) {
		const result = []
		result.push(`<p>${person.name}</p>`)
		result.push(renderPhoto(person.photo))
		result.push(`<p>title: ${person.photo.title}</p>`) // 반복코드
		result.push(emitPhotoData(person.photo)) // 호출
		return result.join('\n')
	}
	function photoDiv(p) {
		return [
			`<div>`,
			// 3. 추출함 함수 호출, 테스트
			zznew(p)`</div>`,
		].join(`\n`)
	}
	// 3. 호출자가 둘 이상이면, 호출자 중 하나에서 다른 함수로 추출.
	function zznew(p) {
		return [
			`<p>title: ${p.title}</p>`, // 반복코드
			emitPhotoData(p), // 호출
		].join(`\n`)
	}
	function emitPhotoData(aPhoto) {
		const result = []
		result.push(`<p>location: ${aPhoto.location}</p>`)
		result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
		return result.join(`\n`)
	}
}
// todo 4. 다른 호출자에서 추출한 함수를 사용 수정. 테스트
// 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래함수를 제거
// 6. 함수 이름 복구.
{
	function renderPerson(outStream, person) {
		const result = []
		result.push(`<p>${person.name}</p>`)
		result.push(renderPhoto(person.photo))
		// 4. 다른 호출자에서 추출한 함수를 사용 수정. 테스트
		result.push(zznew(person.photo))
		return result.join('\n')
	}
	function photoDiv(p) {
		return [
			`<div>`,
			zznew(p)`</div>`,
		].join(`\n`)
	}
	function zznew(p) {
		return [
			`<p>title: ${p.title}</p>`, 
			emitPhotoData(p), 
		].join(`\n`)
	}
	function emitPhotoData(aPhoto) {
		const result = []
		result.push(`<p>location: ${aPhoto.location}</p>`)
		result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
		return result.join(`\n`)
	}
}
// todo 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래함수를 제거
// todo 6. 함수 이름 복구.
{
	function renderPerson(outStream, person) {
		const result = []
		result.push(`<p>${person.name}</p>`)
		result.push(renderPhoto(person.photo))
		result.push(zznew(person.photo))
		return result.join('\n')
	}
	function photoDiv(p) {
		return [`<div>`, zznew(p)`</div>`].join(`\n`)
	}
	// 6. 함수 이름 복구.
	function emitPhotoData(p) {
		return [
			`<p>title: ${p.title}</p>`,
			// 5. 원래 함수를 새로운 함수 안으로 인라인한 후 원래함수를 제거
			`<p>location: ${p.location}</p>`,
			`<p>date: ${p.date.toDateString()}</p>`,
			// emitPhotoData(p),
		].join(`\n`)
	}
	// function emitPhotoData(aPhoto) {
	// 	const result = []
	// 	result.push(`<p>location: ${aPhoto.location}</p>`)
	// 	result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
	// 	return result.join(`\n`)
	// }
}
