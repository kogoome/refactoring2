import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('province', ()=>{
  let asia;
  beforeEach(()=> asia = new Province(sampleProvinceData()) ) // 1. 설정된 표준 픽스쳐

  it('shortfall', ()=>{expect(asia.shortfall).equal(5)})
  it('profit', ()=>{expect(asia.profit).equal(230)})
  it('change production', ()=>{
    asia.producers[0].production = 20 // 2. 픽스쳐 재설정
    expect(asia.shortfall).equal(-6) // 3. 실행 검증
    expect(asia.profit).equal (292) // 3. 실행 검증
    // it 구문 하나에 두개의 테스트를 거치고 있는데, 일반적으로 하나씩 하는게 좋다.
    // 앞쪽 검증을 통과하지 못하면 나머지 검증은 실행해보지 못하는데, 실패 원인 파악 정보를 놓칠 수 있다.
    // 여기서는 두 검증이 밀접하다고 판단하여 모아두었다.
  });

  // 위의 테스트 패턴을
  // 설정-실행-검증, 조건-발생-결과 , 준비-수행-단언
  // 등의 3단계로 부른다.

  // 4단계 해체가 있는데, 생성하는데 시간이 너무 걸려서
  // 여러 테스트가 공유해야만 하는 픽스쳐를 사용할 때가 있지만
  // 실무단계에선 사용하지 않을 때가 많다.
});

