import {Province,sampleProvinceData} from './2.sample.js'
import {assert, expect} from 'chai'

describe('string for producers', ()=>{
  let noProducer
  beforeEach(()=>{
    const data = {
      name:"String producers",
      producers:"", // 생산자가 없음
      demand:30,
      price:20
    }
    noProducer = new Province(data)
  })

  it('shortfall', ()=>{expect(noProducer.shortfall).equal(30)})
  it('profit', ()=>{expect(noProducer.profit).equal(0)})
  // TypeError: doc.producers.forEach is not a function
  // 모카는 에러도 실패로 처리한다.
  // 사용자한테 데이터를 입력받아 사용할 경우는 유효성 검사가 필요하지만,
  // 같은 코드베이스의 모듈 사이에 유효성 검사 코드가 많으면 중복검증의 문제가 생길 수 있다.
});

