import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
  it('profit', function(){ // 1. 수익테스트 추가
    const asia = new Province(sampleProvinceData()) // 3. 코드 중복이 보인다.
    expect(asia.profit).equal(230) // 2. 수익 테스트도 통과
  })
});

