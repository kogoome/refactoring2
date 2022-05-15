import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('province', ()=>{
  let asia
  beforeEach(()=> asia = new Province(sampleProvinceData()) )

  it('shortfall', ()=>{expect(asia.shortfall).equal(30)})
  it('profit', ()=>{expect(asia.profit).equal(0)})
  it('zero demand', ()=>{
    asia.demand = 0 // 수요가 없음
    expect(asia.shortfall).equal(-25)
    expect(asia.profit).equal(0)
  })
  it('negative demand', ()=>{
    asia.demand = -1 // 수요가 음수
    expect(asia.shortfall).equal(-26)
    expect(asia.profit).equal(-10)
  })
  it('empty string demand', ()=>{
    asia.demand = "" // 수요가 빈 문자열
    expect(asia.shortfall).NaN
    expect(asia.profit).NaN
  })
  // 문제가 생길 가능성이 있는 경계조건을 생각해보고 집중적으로 테스트하자.
});

