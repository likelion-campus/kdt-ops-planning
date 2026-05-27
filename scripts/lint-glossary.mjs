// glossary-lint: 본문에서 사용된 핵심 용어가 glossary.yml 에 정의되어 있는지 검사.
//
// 룰:
//   1. 모든 md 파일은 frontmatter `terms:` 에 사용한 도메인 용어를 명시한다.
//   2. terms[]에 적힌 용어는 shared/glossary.yml 또는 같은 팀의 3-backend/glossary.yml 에 정의돼 있어야 한다.
//   3. 정의되지 않은 용어가 있으면 exit 1.
//
// 본문 전수 NLP 검사는 의도적으로 하지 않음 (false positive 폭주 방지).
// "선언된 용어가 정의돼 있는가"만 강제 → 작성자가 능동적으로 용어 정리하게 유도.

import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const root = process.cwd();

function loadGlossary(file) {
  if (!fs.existsSync(file)) return {};
  const doc = yaml.load(fs.readFileSync(file, 'utf8')) || {};
  return doc.terms || {};
}

const sharedTerms = loadGlossary(path.join(root, 'shared/glossary.yml'));
const teamTerms = {
  campfire: { ...sharedTerms, ...loadGlossary(path.join(root, 'campfire/3-backend/glossary.yml')) },
  classroom: { ...sharedTerms, ...loadGlossary(path.join(root, 'classroom/3-backend/glossary.yml')) },
};

const targets = globSync('{campfire,classroom,shared}/**/*.md', { cwd: root });
let errors = 0;

for (const rel of targets) {
  const full = path.join(root, rel);
  const raw = fs.readFileSync(full, 'utf8');
  let fm;
  try {
    fm = matter(raw).data;
  } catch (e) {
    console.error(`::error file=${rel}::frontmatter parse error: ${e.message}`);
    errors++;
    continue;
  }
  const declared = fm.terms;
  if (!Array.isArray(declared) || declared.length === 0) continue;

  const team = rel.startsWith('campfire/') ? 'campfire'
            : rel.startsWith('classroom/') ? 'classroom'
            : null;
  const known = team ? teamTerms[team] : sharedTerms;

  for (const t of declared) {
    if (!known[t]) {
      console.error(`::error file=${rel}::undefined term "${t}". Add to shared/glossary.yml or ${team}/3-backend/glossary.yml`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`glossary-lint failed: ${errors} undefined term(s)`);
  process.exit(1);
}
console.log('glossary-lint: ok');
