# StudyFlow
StudyFlow adalah project final mata kuliah Web Client Development berupa prototype website produktivitas belajar
untuk mahasiswa. Project ini membantu pengguna mengatur waktu belajar, menggunakan Pomodoro, dan mengulang materi dengan flashcard.

## Tujuan Project
Project ini digunakan sebagai latihan penerapan:
- HTML semantic
- Tailwind CSS via CDN
- JavaScript dasar
- Git dan GitHub workflow dalam tim
- Pull Request dan branch-based collaboration

## Fitur Utama
| Fitur | Folder | Branch |
|---|---|---|
| Landing Page | `index.html` | `feat/landing-page` |
| Flashcard | `fitur/flashcard/` | `feat/flashcard-page` |
| Pomodoro | `fitur/pomodoro/` | `feat/pomodoro-page` |
| Task Calendar | `fitur/task-calendar/` | `feat/task-calendar-page` |

## Tech Stack
- HTML5
- Tailwind CSS CDN
- JavaScript dasar
- GitHub untuk version control dan kolaborasi
- Live Server untuk menjalankan project secara lokal

## Struktur Folder
```txt
study-flow/
├── index.html
├── fitur/
│ ├── flashcard/
│ ├── pomodoro/
│ └── task-calendar/
├── docs/
└── .github/
```

## Cara Menjalankan Project
1. Clone repository:
```bash
git clone https://github.com/LeroyChris/study-flow.git
```

2. Masuk ke folder project:
```bash
cd study-flow
```

3. Buka project di VS Code:
```bash
code .
```

4. Jalankan menggunakan extension Live Server.

5. Buka halaman utama:
```txt
index.html
```

Atau buka halaman fitur:
```txt
fitur/flashcard/index.html
fitur/pomodoro/index.html
fitur/task-calendar/index.html
```

## Branch Utama
- `main` = branch stabil / baseline demo.
- `development` = branch integrasi untuk progress fitur.
- `feat/...` = branch kerja masing-masing fitur.

## Workflow Singkat
1. Selalu mulai dari `development`.
2. Buat branch fitur dari `development`.
3. Kerjakan fitur di branch masing-masing.
4. Commit perubahan dengan message yang jelas.
5. Push branch ke GitHub.
6. Buat Pull Request ke `development`.
7. Repo owner melakukan review dan merge.

## Dokumentasi Internal Tim
- `docs/CONTRIBUTING.md` - panduan cara kerja tim.
- `docs/BRANCH_AND_COMMIT_GUIDE.md` - panduan penamaan branch dan commit.
- `docs/TASK_DIVISION.md` - pembagian tugas fitur.

## Status Project
Project ini masih dalam tahap pengembangan awal dan digunakan untuk pembelajaran Web Client Development.