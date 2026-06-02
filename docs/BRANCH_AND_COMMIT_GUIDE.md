# Branch and Commit Guide

## Branch Utama
| Branch | Fungsi |
|---|---|
| `main` | Versi stabil / demo |
| `development` | Integrasi progress fitur |
| `feat/...` | Branch fitur |
| `fix/...` | Branch perbaikan bug |
| `docs/...` | Branch dokumentasi |
| `chore/...` | Branch setup/struktur teknis |
| `style/...` | Branch perubahan tampilan |

## Nama Branch Fitur
Gunakan huruf kecil dan tanda hubung.
Contoh benar:
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
Contoh kurang tepat:
```txt
Fitur-Pomodoro
featureCalendar
branchRoy
coba-coba
final-fix
```

## Format Commit
Gunakan format:
```txt
type: deskripsi singkat
```
Contoh:
```txt
feat: create pomodoro page structure
style: improve pomodoro timer layout
fix: fix task calendar link
docs: update README workflow
chore: restructure feature folders
```

## Jenis Commit
| Type | Kegunaan |
|---|---|
| `feat` | Menambahkan fitur baru |
| `style` | Mengubah tampilan/layout |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `chore` | Setup teknis/struktur folder |

## Tips Commit
- Satu commit sebaiknya fokus pada satu perubahan.
- Jangan commit file yang tidak relevan.
- Commit message harus bisa dipahami tanpa membuka kode.
- Jangan gunakan message seperti `update`, `fix lagi`, atau `coba`.