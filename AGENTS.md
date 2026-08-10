# SportifyInsider Coding Agent Instructions

These rules apply to coding agents working in this repository.

## Branch and review safety

- Never commit feature or fix work directly to `master`.
- Create a dedicated branch for each task. Prefer `agent/<short-description>` for agent-created branches.
- Keep changes focused on the requested task and avoid unrelated refactors.
- Open a pull request targeting `master` after the work is complete.
- Do not merge a pull request or deploy production changes without explicit human approval.

## Before changing code

1. Inspect the existing implementation and reuse established patterns where practical.
2. Understand the relevant routes, components, API calls, and configuration before editing them.
3. Prefer the smallest change that correctly solves the task.

## Validation

Before considering work complete:

1. Install dependencies with `npm ci` when necessary.
2. Run tests non-interactively with `npm test -- --watchAll=false`.
3. Run `npm run build`.
4. Fix failures caused by the proposed changes before opening the pull request.
5. In the pull request, report what was changed and which validation commands passed or failed.

## Production and secrets

- Never commit API keys, passwords, tokens, private keys, database credentials, or `.env` secrets.
- Never expose server-side secrets in React client code.
- Do not directly SSH into, restart, reconfigure, or deploy to production as part of ordinary coding tasks.
- Do not modify production data.
- Treat deployment configuration, authentication, billing, and security-sensitive changes as requiring explicit human review.

## Frontend conventions

- Preserve the existing SportifyInsider visual language unless a redesign is explicitly requested.
- Keep components understandable and avoid unnecessary dependencies.
- Reuse existing API/service utilities instead of duplicating network logic when possible.
- Handle loading, empty, and error states for data-driven interfaces.
- Maintain responsive behavior for mobile and desktop.

## Pull request summary

Every agent-created pull request should state:

- What changed.
- Why it changed.
- Important files affected.
- Tests/build commands run and their results.
- Any known risks, follow-up work, or manual checks needed.
