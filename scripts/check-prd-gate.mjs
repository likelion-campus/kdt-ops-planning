// prd-gate: PRD frontmatter status 별 사전조건 검증
//
// status: draft           → 조건 없음
// status: design-review   → frontmatter.figma 필드 1개 이상
// status: tech-review     → 위 + frontmatter.api_refs 1개 이상
// status: ready-for-dev   → 위 + figma-links.yml 매핑 + api-contract.yml 존재 + endpoint 매칭

import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const root = process.cwd();
const prds = globSync('{campfire,classroom}/1-planning/prd/**/*.md', { cwd: root });
let errors = 0;

function fail(file, msg) {
  console.error(`::error file=${file}::${msg}`);
  errors++;
}

for (const rel of prds) {
  const raw = fs.readFileSync(path.join(root, rel), 'utf8');
  const fm = matter(raw).data || {};
  const status = fm.status || 'draft';
  const team = rel.split('/')[0];

  if (status === 'draft') continue;

  if (!fm.figma || (Array.isArray(fm.figma) && fm.figma.length === 0)) {
    fail(rel, `status=${status} requires frontmatter "figma" (>=1 link)`);
  }

  if (status === 'tech-review' || status === 'ready-for-dev') {
    if (!fm.api_refs || fm.api_refs.length === 0) {
      fail(rel, `status=${status} requires frontmatter "api_refs" (>=1 endpoint id)`);
    }
  }

  if (status === 'ready-for-dev') {
    const figmaLinksPath = path.join(root, team, '2-design/figma-links.yml');
    const apiContractPath = path.join(root, team, '3-backend/api-contract.yml');
    if (!fs.existsSync(figmaLinksPath)) {
      fail(rel, `ready-for-dev requires ${team}/2-design/figma-links.yml`);
      continue;
    }
    if (!fs.existsSync(apiContractPath)) {
      fail(rel, `ready-for-dev requires ${team}/3-backend/api-contract.yml`);
      continue;
    }
    const figmaLinks = yaml.load(fs.readFileSync(figmaLinksPath, 'utf8')) || {};
    const apiContract = yaml.load(fs.readFileSync(apiContractPath, 'utf8')) || {};
    const screens = Object.keys(figmaLinks.screens || {});
    const endpoints = Object.keys(apiContract.endpoints || {});

    const prdId = fm.id || path.basename(rel, '.md');
    const linked = (figmaLinks.prd_map || {})[prdId];
    if (!linked) {
      fail(rel, `ready-for-dev requires figma-links.yml prd_map["${prdId}"] mapping`);
    }
    for (const ref of fm.api_refs || []) {
      if (!endpoints.includes(ref)) {
        fail(rel, `api_refs "${ref}" not found in ${team}/3-backend/api-contract.yml`);
      }
    }
  }
}

if (errors > 0) {
  console.error(`prd-gate failed: ${errors} issue(s)`);
  process.exit(1);
}
console.log('prd-gate: ok');
