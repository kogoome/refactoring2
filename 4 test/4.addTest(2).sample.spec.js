import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('province', function() {
  const asia = new Province(sampleProvinceData());
  // 1. 공통부분을 상위 스코프로 가져왔다. 이렇게 하면 안 된다.
  // 이렇게 하면 테스트끼리 상호작용하게 하는 공유픽스처를 생성하는 원인이 된다.
  // 예를 들어 첫번째 테스트에서 asia 의 속성 일부를 변경하고
  // 다음 테스트에서 변경된 정보로 테스트를 수행하기 때문이다.

  it('shortfall', function() {
    expect(asia.shortfall).equal(5);
  });
  it('profit', function(){
    expect(asia.profit).equal(230)
  })
});

