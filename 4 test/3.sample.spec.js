import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'


// 생산 부족분을 검사하는 테스트
describe('province', function() {
  // 웹스톰은 테스트 코드 왼쪽에 테스트 아이콘이 생겨서 클릭으로 실행가능
  // 초록체크가 뜨면 테스트 성공시 리팩터링 가능,
  // 빨강x 아이콘이 뜨면 버전관리의 최근포인트로 돌아가면 정상화
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData()); // 1. 픽스처 설정
    // assert.equal(asia.shortfall, 5); // 2. 검증 assert
    expect(asia.shortfall).equal(5); // 2. 검증 expect 사용
  });
  // 테스트를 더 추가해보자
});
