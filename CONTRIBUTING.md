# Contributing to CEO of One

Thank you for your interest in contributing! This guide covers the basics.

## Ways to Contribute

### 🐛 Report a Bug
Found an error in a tutorial, broken link, or code issue?
→ [Open a Bug Report](.github/ISSUE_TEMPLATE/bug-report.md)

### 💡 Suggest an Improvement
Have an idea for the course, COO templates, or documentation?
→ [Open a Feature Request](.github/ISSUE_TEMPLATE/feature-request.md)

### 🎓 Submit a Showcase
Built a product using the CEO of One method? Share it!
→ [Showcase Guide](showcase/README.md)

### 📝 Submit a Pull Request

1. **Fork** this repo
2. **Create a branch:** `git checkout -b fix/chapter-5-typo`
3. **Make your changes**
4. **Verify:** If you changed code in `platform/`, run `npm run build && npm test` (must pass 111 tests)
5. **Commit:** Use clear commit messages (e.g., `fix: correct Ch5 payment API example`)
6. **Push and open PR:** Use [our PR template](.github/PULL_REQUEST_TEMPLATE.md)

## Guidelines

### Documentation
- **Tutorials teach "how to talk to AI", not code.** Avoid adding code blocks to chapter READMEs.
- **Be honest.** Don't fabricate success stories or results.
- **Bilingual:** Major changes should update both `README.md` (English) and `README_zh-CN.md` (Chinese).

### Code
- **Build must pass:** `npm run build` — zero errors
- **Tests must pass:** `npm test` — 111/111 (never decrease test count)
- **No cross-feature imports:** `features/` modules must not import from each other
- **No TODO/FIXME/console.log** in production code
- Follow existing patterns in `platform/src/`

### COO Templates
- Changes to `templates/SOUL-COO.md` or `templates/PROCESS-COO.md` should include a changelog entry explaining what real-world problem the change solves.

## Questions?

Open an issue with the `question` label, and we'll help.
