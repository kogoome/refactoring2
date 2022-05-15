1. *.spec.js 파일은 테스트 코드를 작성하는 파일
2. 설치 모듈 mocha (테스트) chai (다양한 어설션 사용)

`npm i --save-dev mocha chai`

3. es6 구문 해석시 바벨 이용

`npm i -D @babel/core @babel/preset-env @babel/register`

4. 실행 커맨드 package.json 스크립트에 등록

`"test": "mocha ./**/*.spec.js --require @babel/register --recursive"`

5. `npm run test`로 모든 경로 spec.js 파일을 테스팅

웹스톰에서는 테스팅 코드 왼쪽에 테스트 아이콘이 있어서 클릭시 개별 테스팅 가능

6. 예제 파일은 아래 spec.js 파일 확인

7. assert 는 테스트 실패시 중단, expect 테스트 실패해도 다른 테스팅을 이어나간다고 함??