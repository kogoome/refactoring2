/*
### 4.2 샘플코드 
(ui 입력값은 괄호로 표기)
|지역      |Asia |수요량|가격 |
|---      |---  |---  |---  |
|         |     |(30) |(20) |
|생산자-3  |비용  |생산량|수익 |
|Byzantium|(10) |(9)  |90   |
|Attalia  |(12) |(10) |120  |
|Sinope   |(10) |(6)  |60   |
|         |     |부족량|총수익|
|         |     |5    |230  |

테스트 툴 : 모카 `npm i --save-dev mocha`
 */

export class Province { // 지역
  constructor(doc) {
    this._name = doc.name
    this._producers = []
    this._totalProduction = 0
    this._demand = doc.demand
    this._price = doc.price
    doc.producers.forEach(d => this.addProducer(new Producer(this, d)))
  }

  addProducer(arg) {
    this._producers.push(arg)
    this._totalProduction += arg.production
  }

  get name() {return this._name} // 접근자프로퍼티
  get producers() {return this._producers.slice();} 
  get totalProduction() {return this._totalProduction;} 
  set totalProduction(arg) {this._totalProduction = arg;} 
  get demand() {return this._demand;} 
  set demand(arg) {this._demand = parseInt(arg);} // 숫자로 파싱해서 저장
  get price() {return this._price;} 
  set price(arg) {this._price = parseInt(arg);} // 숫자로 파싱해서 저장

  // 생산 부족분을 계산
  get shortfall() { return this.demand - this.totalProduction; } // 테스트 패스
  // get shortfall() { return this.demand - this.totalProduction*2; } // 오류주입
  // 수익을 계산
  get profit() { return this.demandValue - this.demandCost; }
  get demandValue() { return this.satisfiedDemand * this.price; }
  get satisfiedDemand() { return Math.min(this._demand, this.totalProduction); }
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a,b) => a.cost-b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}

// Province 클래스 인스턴스 생성인수 doc 제공
export function sampleProvinceData() {
  return {
    name:"Asia",
    producers:[
      {name:"Byzantium", cost:10, production:9},
      {name:"Attalia", cost:12, production:10},
      {name:"Sinope", cost:10, production:6},
    ],
    demand:30,
    price:20
  }
}

class Producer { // 생산자
  constructor(aProvince, data) {
    this._province = aProvince
    this._cost = data.cost
    this._name = data.name
    this._production = data.production || 0
  }

  get name() {return this._name}
  get cost() {return this._cost}
  set cost(arg) {this._cost = parseInt(arg)}
  
  get production() {return this._production;} 
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production; // 지저분
    this._production = newProduction;
  }
}