/**
 * ! 덕타이핑 Duck Typing
 * * '오리처럼 걷고 소리내면 그건 분명 오리라고 결정한다.'
	덕 타이핑은 객체 자신이 어떠한 타입인지가 중요하지 않고, 
	특정 메소드나 속성의 존재로 타입을 판단한다.
	반대의 경우에는 특정 타입을 정의함으로써, 그 타입을 특정하게 된다.
	(타입스크립트의 타입도 이름기반이 아닌 구조형식기반이어서 이름이 다른 클래스도 같은 형식이면 타입체크패스가 가능)

	덕 타이핑은 특정 타입에 얽매이지 않고, 원하는 행동을 할 수 있는 여부로 판단한다.
	그래서 타입에 제약없이 사용하여 보다 유연하게 코드를 작성할 수 있다.
	출처:https://mygumi.tistory.com/367
 */

interface Quackable {
	quack(): void;
}
class Duck implements Quackable {
	quack() { console.log("Quack") }
}
class Person {
	quack() { console.log("Quack") }
}
function inTheForest(quackable: Quackable): void {
	quackable.quack()
}
inTheForest(new Duck()) // Quack
inTheForest(new Person()); // Quack
