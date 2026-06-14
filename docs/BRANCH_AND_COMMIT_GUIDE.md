# Branch and Commit Guide

## Main Branches
| Branch        | Purpose                     |
|---------------|-----------------------------|
| `main`        | Stable version / demo       |
| `development` | Integration of feature progress |
| `feat/...`    | Feature branches            |
| `fix/...`     | Bug fix branches            |
| `docs/...`    | Documentation updates       |
| `chore/...`   | Technical setup/structure   |
| `style/...`   | UI/UX-related changes       |

## Feature Branch Naming
Use lowercase letters and hyphens.
Correct Examples:
```txt
feat/landing-page
feat/flashcard-page
feat/pomodoro-page
feat/task-calendar-page
docs/update-readme
fix/navbar-link
style/pomodoro-layout
chore/restructure-folder
```

Incorrect Examples:
```txt
Fitur-Pomodoro
featureCalendar
branchRoy
coba-coba
final-fix
```

## Commit Message Format
Use the format:
```txt
type: short description
```

Example:
```txt
feat: create structure for Pomodoro page
style: improve Pomodoro timer layout
fix: correct task calendar link
docs: revise README for new structure
chore: reorganize feature folders
```

## Commit Types
| Type   | Description               |
|--------|---------------------------|
| `feat` | Adding new features       |
| `style`| Modifying UI/UX layout    |
| `fix`  | Fixing bugs               |
| `docs` | Updating documentation    |
| `chore`| Technical setups/cleanups |

## Commit Tips
- Each commit should focus on a single change.
- Do not commit unrelated or irrelevant files.
- Commit messages should convey changes without needing the reviewer to open the code.
- Avoid vague messages like `update`, `fix again`, or `test`. Let's keep our history clean and understandable!