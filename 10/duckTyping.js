class 오리 {
	get 소리() {
		return '꽦꽥'
	}
}
class 오리같은사람 {
	get 소리() {
		return '꽦꽥'
	}
}

function 오리소리(오리) { 
  // 오리를 받는다고 정의할수 없어서 오리라는 매개변수 단어가 지칭하는 오리는 의미가 없음.
  // 필요한건 '소리'매서드
	return 오리.소리
}

const a  = new 오리()
const b = new 오리같은사람()
console.log(오리소리(a)) // 꽦꽥
console.log(오리소리(b)) // 꽦꽥
