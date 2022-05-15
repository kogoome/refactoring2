import add from './util.js';
// import assert from 'assert' // 노드 기본모듈
import {assert} from "chai" // vscode 모듈추적이 왜 안되지 웹스톰은 잘됌


const addTestCases = [
  { nums: [1, 2], expect: 3 }, // 성공
  { nums: [3, 4], expect: 7 },
  { nums: [5, 2], expect: 7 }, // 성공
]

/*
describe : 모카 테스트 단위를 지정
it : 개별적 테스트 케이스
*/

describe("./4 test/mochaSample/util.js test", () => {
  addTestCases.forEach(({ nums, expect }) => {
    const [a, b] = nums;
    const result = add(a, b);
    const msg = result === expect ? "성공" : "실패";
    it(msg, () => {
      assert.strictEqual(result, expect);
    })
  })
})


// 테스트 결과
//
//   ./4 test/mochaSample/util.js test
//     √ 성공
// 1) 실패
//     √ 성공
//
//
// 2 passing (6ms)
// 1 failing
//
// 1) ./4 test/mochaSample/util.js test
// 실패:
//
//   AssertionError: expected 7 to equal 6
// + expected - actual
//
// -7
// +6
//
// at Context.<anonymous> (file:///D:/workspace3/refactoring2/4%20test/mochaSample/
// util.spec.js:32:14)
// at processImmediate (node:internal/timers:464:21)

