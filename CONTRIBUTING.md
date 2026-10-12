# Contributing to dslearn

## Required: Use Pull Requests

Everyone except the repository owner `Owaix` must submit changes to the default branch through a pull request. Only `Owaix` may bypass the pull-request requirement and push directly to the default branch. `Owaix` should still prefer pull requests when review or discussion is useful.

An active GitHub ruleset named **Protect master with PRs** targets the default branch, currently `master`:

- Require a pull request before merging.
- `Owaix` is the only bypass actor; everyone else, including administrators, must use a pull request.
- Verify that a non-`Owaix` direct push to `master` is rejected.

Update the ruleset target if the default branch is renamed. The ruleset is enforced by GitHub; this document records the policy.

## Change Workflow

```sh
git switch -c feat/short-description
npm ci
npm run validate
git add <intended-files>
git diff --cached
git commit -m "feat: describe the change"
git push -u origin feat/short-description
```

Open a pull request from the topic branch to `master`. Include the purpose, tests run, and any behavior or compatibility changes. Do not force-push a branch after others have based work on it.

Use `fix/` for bug fixes, `docs/` for documentation, and `test/` for test-only changes. Keep changes focused and add tests for public behavior.
