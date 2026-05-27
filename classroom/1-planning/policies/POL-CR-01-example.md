---
id: POL-CR-01
title: "Lecture Session 입장 정책"
owner: "@pm-classroom-lead"
status: draft
version: 0.1
related_prd: []
terms: [Trainee, Lecture, Session]
---

# POL-CR-01 — Lecture Session 입장 정책

## 의도

Trainee가 강의 시작 직전에 헤매지 않도록, Session 입장 경로를 단일화하고
지각/조퇴를 시스템이 정확히 기록한다.

## 정책

1. Session 입장은 시작 10분 전부터 시작 후 30분까지 허용한다.
2. 입장 후 5분 이상 미접속이 발생하면 조퇴 후보로 표기한다.
3. 외부 도구(Zoom, YouTube Live) 링크는 시작 시각 기준 자동 활성화된다.

## 비정책

- 출석 인정 임계값(예: 80%)은 운영 정책으로 별도 관리.

## 기술값

본 정책에는 URL/상태값을 적지 않는다. `classroom/3-backend/data-model.md` 의 `Session` 참조.
