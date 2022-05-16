// 문제 1 다음 전역데이터를 함수를 이용해 캡슐화하시오.
{
	// 가변 전역 데이터
	let defaultOwner = { firstName: "마틴", lastName: "파울러" }

	// 데이터 참조
	spaceship.owner = defaultOwner

	// 데이터 갱신
	defaultOwner = { firstName: "레베카", lastName: "파슨스" }
}
