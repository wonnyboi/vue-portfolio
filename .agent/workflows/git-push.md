---
description: Git push process with Definition of Done and Korean Commit Convention
---

# Git Push Workflow

## 1. Definition of Done (작업 완료 기준)

Before pushing code, ensure the following criteria are met:

1. **Build Verification (빌드 확인)**:
   - Run `pnpm build` to ensure the project builds without errors.
2. **Lint check (린트 확인)**:
   - Ensure there are no critical linting errors.
3. **Verification (기능 검증)**:
   - Verify the implemented features work as expected in the browser.
   - For UI changes, check responsiveness and localization (Korean).
4. **Clean Code (코드 정리)**:
   - Remove debugging logs (`console.log`) and unused commented-out code.

## 2. Commit Message Convention (커밋 메시지 규칙)

Use Korean for commit messages to ensure clarity.

**Format:**

```
[<Type>] <Title (Korean)>

- <Description (Korean)>
```

**Types:**

- `feat`: 새로운 기능 추가 (New Feature)
- `fix`: 버그 수정 (Bug Fix)
- `refactor`: 코드 리팩토링 (Refactoring)
- `style`: 스타일 수정 (Formatting, CSS)
- `docs`: 문서 수정 (Documentation)
- `chore`: 빌드 업무, 패키지 매니저 설정 등 (Build, Config)

**Example:**

```
[feat] 홈페이지 소개 섹션 파티클 이펙트 추가

- 프로필 이미지 중앙에서 키워드가 생성되어 퍼지는 애니메이션 구현
- 관련 키워드 20개 추가 및 생성 주기 조정
```

## 3. Workflow Steps

1. **Check Status**:
   ```bash
   git status
   ```
2. **Add Changes**:
   ```bash
   git add .
   ```
3. **Commit**:
   ```bash
   git commit -m "[feat] 홈페이지 UI 개선 및 한글화 적용" -m "- 프로필 이미지 교체 및 파티클 이펙트 적용\n- 네비게이션 및 전체 페이지 한글화 완료"
   ```
4. **Push**:
   ```bash
   git push origin <branch-name>
   ```
