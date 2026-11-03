# v0.1.1 검증 기록

2026-10-12

- 웹 모델 자동 테스트 34개 통과.
- Android `assembleRelease lintRelease` 성공. lint 오류 0개, 경고 14개(고정 세로 방향, JavaScript 사용, 의존성 업데이트 안내, 호환성 API 및 아이콘 안내 등). JavaScript는 번들에 포함된 로컬 앱 코드에만 사용하고 외부 콘텐츠를 WebView에 로드하지 않습니다.
- APK v2 서명 검증 통과. 패키지 `com.saebom.dietdiary`, 버전 0.1.1 / versionCode 2, Android 8.0 이상.
- APK 안의 오프라인 웹 자산이 검사한 원본 파일과 바이트 단위로 일치함을 확인.
- APK의 인터넷·카메라·위치·연락처·저장소 전체 접근 권한 없음. AndroidX 내부용 자체 signature 권한만 선언됨.
- 브라우저에서 첫 실행, 샘플 진입, 체중 저장 및 JSON 백업 다운로드 확인. 브라우저 새 실행 오류 없음.
- 갤럭시 실기기 설치, Android 시스템 파일 선택창 및 제스처 실행은 아직 미검증입니다.

APK SHA-256:
`d70f20a7a5de307b28fa8f5f14ae7eea8f0241b21560ac3fc1f1385b4055df63`


## v0.2.0 (2026-11-03)

40 model tests pass, including guaranteed operating income, furniture attribution, weekly counter double-claim/undo, distinct-day project progress, settlement idempotency and occurrence-only rest. Browser verified weekly target 3, first practice, operating estimate +141 G, project date contribution; mobile viewport 390px has no horizontal overflow. Same-package/same-key signed APK, versionCode 3. Android release build and lint checked. Physical phone install and long-running economy not tested. Earlier preview images show v0.1.1; use the current app for updated UI.
