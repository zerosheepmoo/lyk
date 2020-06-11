# LYK

LYK 는 오픈 소스 typescript / javascript 를 이용한 웹 게임 제작 툴입니다.

## 테스트 방법

해당 레포지토리를 클론 한 후 다음과 같이 실행하세요.

```bash
npm i
```

그러면 필요한 패키지가 모두 설치되므로 다음의 명령을 실행시켜 테스트해보세요.

```bash
npm run dev
```

## 개발

타입스크립트로 개발 중입니다.

### 사용

- `index.html` 에 스크립트로 포함시켜서 진행할 수 있다.
- `example.js` 를 참조

### 테스트

- `/examples` 에 html 파일과 js 파일을 만들어 테스트한다.
- 만약 `/examples/item-map.html` 에 접근하고 싶다면, npm run dev 후 `http://localhost:9011/examples/item-map.html` 로 들어가면된다.