{
	function renderPerson(outStream, person) {
		outStream.write(`<p>${person.name}</p>\n`)
		renderPhoto(outStream, person.photo)
		emitPhotoData(outStream, person.photo)
	}
	function listRecentPhotos(outStream, photos) {
		photos
			.filter((p) => p.date > recentDateCutoff())
			.forEach((p) => {
				outStream.write('<div>\n')
				emitPhotoData(outStream, p)
				outStream.write('</div>\n')
			})
	}
	function emitPhotoData(outStream, photo) {
		outStream.write(`<p>title: ${photo.title}</p>\n`)
		outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
		// ! 로케이션정보를 상황에 따라 다르게 만들어야 한다고 가정
		outStream.write(`<p>location: ${photo.location}</p>\n`)
	}
}

// 1. 호출자가 적고 피호출 함수도 간단하면, 피호출 함수의 옮길 문장을 호출부로 옮기기. 테스트 통과시 종료
// todo 2. 복잡한 상황이라면, 이동하지 않길 원하는 문장을 임시 함수 추출
// 3. 원래 함수를 인라인
// 4. 추출된 함수의 이름을 원래 함수의 이름으로 변경
{
	function renderPerson(outStream, person) {
		outStream.write(`<p>${person.name}</p>\n`)
		renderPhoto(outStream, person.photo)
		emitPhotoData(outStream, person.photo)
	}
	function listRecentPhotos(outStream, photos) {
		photos
			.filter((p) => p.date > recentDateCutoff())
			.forEach((p) => {
				outStream.write('<div>\n')
				emitPhotoData(outStream, p)
				outStream.write('</div>\n')
			})
	}
	function emitPhotoData(outStream, photo) {
		// 2. 이동하지 않길 원하는 문장을 임시 함수 추출
		zznew(outStream, photo)
		outStream.write(`<p>location: ${photo.location}</p>\n`)
	}
	function zznew(outStream, photo) {
		outStream.write(`<p>title: ${photo.title}</p>\n`)
		outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
	}
}
// todo 3. 원래 함수를 인라인
// 4. 추출된 함수의 이름을 원래 함수의 이름으로 변경
{
	function renderPerson(outStream, person) {
		outStream.write(`<p>${person.name}</p>\n`)
		renderPhoto(outStream, person.photo)
		zznew(outStream, person.photo)
		outStream.write(`<p>location: ${photo.location}</p>\n`)// 각각 테스트
	}
	function listRecentPhotos(outStream, photos) {
		photos
			.filter((p) => p.date > recentDateCutoff())
			.forEach((p) => {
				outStream.write('<div>\n')
				zznew(outStream, p)
				outStream.write(`<p>location: ${photo.location}</p>\n`)// 각각 테스트
				outStream.write('</div>\n')
			})
	}
	function emitPhotoData(outStream, photo) {
		zznew(outStream, photo)
		// 3. 이동시킬 문장을 각 호출부에 인라인
		// outStream.write(`<p>location: ${photo.location}</p>\n`)
	}
	// 호출부에 임시 함수 적용
	function zznew(outStream, photo) {
		outStream.write(`<p>title: ${photo.title}</p>\n`)
		outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
	}
}
// todo 4. 추출된 함수의 이름을 원래 함수의 이름으로 변경
{
	function renderPerson(outStream, person) {
		outStream.write(`<p>${person.name}</p>\n`)
		renderPhoto(outStream, person.photo)
		emitPhotoData(outStream, person.photo)
		outStream.write(`<p>location: ${photo.location}</p>\n`)
	}
	function listRecentPhotos(outStream, photos) {
		photos
			.filter((p) => p.date > recentDateCutoff())
			.forEach((p) => {
				outStream.write('<div>\n')
				emitPhotoData(outStream, p)
				outStream.write(`<p>location: ${photo.location}</p>\n`)
				outStream.write('</div>\n')
			})
	}
	// 테스트 이상없을시 삭제
	// function emitPhotoData(outStream, photo) {
	// 	zznew(outStream, photo)
	// 	// 3. 이동시킬 문장을 각 호출부에 인라인
	// 	// outStream.write(`<p>location: ${photo.location}</p>\n`)
	// }
	// 함수이름 변경
	function emitPhotoData(outStream, photo) {
		outStream.write(`<p>title: ${photo.title}</p>\n`)
		outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
	}
}
