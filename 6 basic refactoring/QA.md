함수 표현식 
변수만 호이스팅

함수 선언문 
선언부까지 다 올라가서 호이스팅

function add(a,b) {

}

function getName() {
  console.log('name');
}

var name = function() {
  console.log('name');
};

호이스팅 : 자바스크립트 엔진 특성

선언문 보다 표현식
선언문 오버라이딩
중복선언시 동작 추적어려워서 표현식으로 쓰자
린트사용하면 선언문 중복을 찾아서 오류를 만들어줌

