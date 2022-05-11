import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('no producers', ()=>{
  let noProducer
  beforeEach(()=>{
    const data = {
      name:"No producers",
      producers:[], // 생산자가 없음
      demand:30,
      price:20
    }
    noProducer = new Province(data)
  })

  it('shortfall', ()=>{expect(noProducer.shortfall).equal(30)}) // 생산부족분은 전량
  it('profit', ()=>{expect(noProducer.profit).equal(0)}) // 수익은 0
});

