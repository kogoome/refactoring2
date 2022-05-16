let tphd = "untitled"
// 어떤 참조는 다음과 같이 변수를 읽기만 한다.
result += <h1>${tpHd}</h1>
// 값을 수정하는 곳도 있다고 해보자.
tpHd = obj["articleTitle"]
// 1. 나는 이럴 때 주로 변수 캡슐화하기(6.6)로 처리한다.
result += <h1>${title()}</h1>
setTitle(obj["articleTitle"])
function title() { return tpHd } // tphd 변수의 게터
function setTitle(arg) { tpHd = arg } // tphd 변수의 세터

// 캡슐화 후에는 변수 이름을 바꿔도 된다.

let title = "untitled"
function title() {
	return title
}
function setTitle(arg) {
	title = arg
}

// 2. 그런 다음 래핑 함수들을 인라인해서 모든 호출자가 변수에 직접 접근하게 하는 방법도 있지만, 나는 별로 내켜하지 않는 방식이다. 이름을 바꾸기 위해 캡슐화부터 해야 할 정도로 널리 사용되는 변수라면 나중을 위해서라도 함수 안에 캡슐화된 채로 두는 편이 좋다고 생각하기 때문이다.

// 함수를 인라인한다면 값을 얻을 때는 getTitle() 게터를 호출하고 변수 이름에는 밑줄(_)을 붙이지 않았을 것이다.