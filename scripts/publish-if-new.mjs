/**
 * npm에 현재 버전이 없으면 publish, 이미 있으면 스킵.
 * Vercel buildCommand에서 호출됨.
 *
 * 필요한 환경변수: NPM_TOKEN (Vercel 대시보드에서 설정)
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("packages/ui-v3/package.json", "utf-8"));
const { name, version } = pkg;

// NPM_TOKEN 없으면 스킵 (로컬 개발 환경)
if (!process.env.NPM_TOKEN) {
  console.log(`⏭️  NPM_TOKEN not set — skipping publish`);
  process.exit(0);
}

// npm 인증 설정
execSync(`echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc`, {
  stdio: "inherit",
});

// 이미 배포된 버전인지 확인
try {
  execSync(`npm view ${name}@${version} version`, { stdio: "pipe" });
  console.log(`⏭️  ${name}@${version} already published — skipping`);
} catch {
  // 버전이 없으면 publish
  console.log(`📦 Publishing ${name}@${version}...`);
  execSync(`pnpm --filter ${name} publish --access public --no-git-checks`, {
    stdio: "inherit",
  });
  console.log(`✅ ${name}@${version} published!`);
}
