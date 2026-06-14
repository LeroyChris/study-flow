# Contributing Guide - StudyFlow

This document provides guidelines for team members working on the StudyFlow project.

## Core Principles
- Never work directly on `main`.
- Avoid direct work on `development`, except by repository owners in specific cases.
- Each feature must be developed in its own separate branch.
- All work merges into `development` through Pull Requests.
- `main` is reserved for stable versions or demos only.

## Daily Workflow
Before starting any work:
```bash
git switch development
git pull origin development
```
Always create a new feature branch from the latest development version if no branch exists:
```bash
git switch development
git pull origin development
git switch -c feat/<feature-name>
git push -u origin feat/<feature-name>
```
If your branch already exists, switch to it:
```bash
git switch feat/<feature-name>
```
If the branch exists on remote but not locally:
```bash
git fetch --all --prune
git switch -c feat/<feature-name> origin/feat/<feature-name>
```
Update your feature branch with the latest changes from `development`:
```bash
git merge development
```
After completing your work:
```bash
git status
git add .
git commit -m "type: brief description of changes"
git push
```
Then create a Pull Request to `development`.

## Pull Request Target
For feature work:
```txt
base: development
compare: feat/<feature-name>
```
For final release:
```txt
base: main
compare: development
```

## Testing Before PR
Before submitting a Pull Request, ensure that:
- The project runs successfully using the build tools (`npm run dev`).
- Modified pages load without error.
- Page links navigate correctly.
- The UI appears as intended, free of layout issues.
- Irrelevant or unnecessary files are not included in the commit.