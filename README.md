# 별내자이 더 스타 이그제큐티브

별내자이 더 스타 이그제큐티브를 소개하는 반응형 정적 홈페이지입니다.

## 구성

- `index.html` — 프로젝트 소개와 페이지 콘텐츠
- `styles.css` — 반응형 디자인과 시각 스타일
- `script.js` — 모바일 메뉴와 로그인 없는 관심고객 등록 처리
- `supabase-config.js` — Supabase 프로젝트 URL과 공개 anon 키 설정
- `supabase-schema.sql` — 비로그인 접수와 고객정보 조회 차단을 위한 테이블/RLS 설정

별도 빌드 과정 없이 정적 호스팅에 배포할 수 있습니다. 현재 공급 현황과 계약 조건은 자이 공식 안내를 확인하도록 연결했습니다.

## 관심고객 등록 연결

1. 무료 Supabase 프로젝트를 만들고 SQL Editor에서 `supabase-schema.sql`을 한 번 실행합니다.
2. `supabase-config.js`의 `url`과 `anonKey`에 프로젝트의 Project URL과 anon/publishable key를 입력합니다.
3. 정적 사이트 파일을 다시 배포합니다.

폼은 이름, 휴대폰 번호, 동의 여부와 시각을 저장합니다. 비로그인 방문자는 등록만 할 수 있고, `public`·`anon`·`authenticated` 역할에는 고객정보 조회 권한을 주지 않습니다. 고객정보는 프로젝트 소유자가 Supabase 대시보드에서 확인합니다. 실제 운영 전 개인정보 처리방침, 보유기간, 운영 주체와 연락처를 사이트에 명시하세요. 접수 DB 설정 전에는 폼이 접수를 완료했다고 표시하지 않고 대표번호를 안내합니다.
