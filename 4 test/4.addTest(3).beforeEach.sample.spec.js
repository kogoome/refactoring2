import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('province', ()=>{
  let asia;
  beforeEach(()=> asia = new Province(sampleProvinceData()) )
  // beforeEach() 의 구문은 각 테스트(it) 바로 전에 실행되어
  // asia 를 초기화, 모든 테스트(it)를 독립적으로 구성할 수 있다.
  // 이뮤터블 픽스쳐는 사용할 필요가 없다.

  it('shortfall', ()=>{expect(asia.shortfall).equal(5);});
  it('profit', ()=>{expect(asia.profit).equal(230)})
});

