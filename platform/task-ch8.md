You are preparing a Next.js project for deployment to Vercel. NOT writing new features — making deployment-ready changes.

## Context
Platform at C:\Users\ASUS\Desktop\cc_projects\ceo-of-one\platform
Next.js 14.2.3, already builds and tests clean (94/94 tests, zero errors).

## Tasks

### 1. Update .env.example
Add all required environment variables with placeholder values:
```
JWT_SECRET=your-secret-change-in-production
NODE_ENV=production
```

### 2. Update next.config.js
Add standalone output for Vercel optimization:
```js
const nextConfig = {
  output: 'standalone',
}
```

### 3. Create vercel.json
Minimal config in platform root:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### 4. Add a health check endpoint (if not exists)
GET /api/health should return { status: "ok", version: "0.1.0" } — this already exists, just verify it works.

### 5. Verify everything
- npm run build — zero errors
- npm test — 94/94 pass
- No TODO/FIXME/console.log in any modified file
- .env.example lists all required env vars
- No secrets or API keys in any file

## Acceptance Criteria (ZERO bugs)
1. npm run build — zero errors
2. npm test — ALL 94 tests pass
3. .env.example complete with all env vars documented
4. next.config.js has standalone output
5. vercel.json exists
6. No secrets in any file
7. No modifications to features/ modules
