# Git Workflow Guide

This guide explains a small, reviewable Git workflow for `dslearn`. Git records source history; npm publishing is a separate release action.

## Pull-Request-Only Policy

Everyone except repository owner `Owaix` must send changes to the default branch through a pull request. `Owaix` is the only person allowed to bypass that requirement and push directly to the default branch, but should still prefer a pull request when review or discussion is useful. Contributors and maintainers other than `Owaix` must push work to a topic branch and merge through a pull request.

GitHub enforces this policy with an active ruleset named **Protect master with PRs** targeting the default branch, currently `master`:

1. The rule requires a pull request before merging.
2. `Owaix` is the only actor on the bypass list; all other users, including administrators, must use pull requests.
3. Verify that a non-`Owaix` direct push to `master` is rejected.

If the default branch is renamed, update the rule's target. See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the contributor workflow.

## Check Repository State

```sh
git status --short --branch
git branch --show-current
git log --oneline -5
```

`status` shows changed and untracked files, `branch --show-current` prints the active branch, and `log` shows recent commits. Review status before staging so generated or unrelated files are not included by accident. `node_modules/`, `dist/`, coverage output, and tarballs are ignored by `.gitignore`.

## Start a Change

If the project has not been initialized as a Git repository yet, create its first commit locally:

```sh
git init
git add .
git diff --cached
git commit -m "chore: initialize dslearn repository"
```

This is appropriate for a new, clean repository; `.gitignore` keeps generated output and dependencies out of the commit. Do not push this commit directly to the default branch. Push it on a setup branch and merge it through a pull request. In an existing repository, stage only the files you intend to commit as shown below.

Create a short-lived branch for each change:

```sh
git switch -c feat/describe-change
```

Use a descriptive branch name such as `feat/trie-prefix-search` or `fix/hash-table-resize`.

## Stage and Commit

Run checks before committing:

```sh
npm run validate
```

Review the diff, stage only the intended files, then commit:

```sh
git diff
git add README.md package.json package-lock.json CHANGELOG.md LICENSE .gitignore
git add src tests docs examples benchmarks
git add tsconfig.json vitest.config.ts eslint.config.js prettier.config.js
git diff --cached
git commit -m "feat: describe the change"
```

`git add` stages changes for the next commit; `git diff --cached` lets you review exactly what is staged. Use a concise commit message describing the change, for example `fix: handle NaN graph vertices`.

## Push and Review

If no remote is configured, add the repository URL first:

```sh
git remote add origin https://github.com/<owner>/dslearn.git
git remote -v
```

Skip `remote add` when `origin` already exists; use `git remote -v` to inspect it.

```sh
git push -u origin feat/describe-change
```

The `-u` option sets the upstream branch so later pushes can use `git push`. Everyone except `Owaix` must open a pull request against `master` and include the behavior change, test results, and any compatibility impact. `Owaix` may push directly but should prefer a PR when collaboration is useful.

## Release Tags

After a release has been reviewed and published, tag the release commit and push the tag:

```sh
git tag -a v1.0.0 -m "Release dslearn 1.0.0"
git push origin v1.0.0
```

Tags mark Git history; they do not publish an npm package. `npm publish` is a separate external action documented in [the npm publishing guide](npm-publishing.md).

## Useful Recovery Commands

```sh
git diff                 # inspect unstaged edits
git diff --cached        # inspect staged edits
git restore --staged .   # unstage changes without deleting edits
git switch main          # switch branches when the worktree permits it
```

Avoid `git reset --hard` and forced pushes unless the consequences are understood and the team explicitly approves them. Never discard another contributor's work to make a branch appear clean.
