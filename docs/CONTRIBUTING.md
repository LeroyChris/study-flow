# Contributing Guide - StudyFlow
Dokumen ini menjelaskan cara anggota tim mengerjakan project StudyFlow.

## Prinsip Utama
- Jangan kerja langsung di `main`.
- Jangan kerja langsung di `development`, kecuali repo owner untuk kondisi tertentu.
- Setiap fitur dikerjakan di branch masing-masing.
- Semua hasil kerja masuk ke `development` melalui Pull Request.
- `main` hanya digunakan untuk versi stabil atau demo.

## Workflow Harian
Sebelum mulai kerja:
```bash
git switch development
git pull origin development
```
Masuk ke branch fitur masing-masing:
```bash
git switch feat/nama-fitur
```
Kalau branch belum ada di lokal tapi sudah ada di remote:
```bash
git fetch --all --prune
git switch -c feat/nama-fitur origin/feat/nama-fitur
```
Update branch fitur dengan perubahan terbaru dari `development`:
```bash
git merge development
```
Setelah coding:
```bash
git status
git add .
git commit -m "type: deskripsi perubahan"
git push
```
Lalu buat Pull Request ke `development`.

## Target Pull Request
Untuk fitur:
```txt
base: development
compare: feat/nama-fitur
```
Untuk release final:
```txt
base: main
compare: development
```

## Testing Sebelum PR
Sebelum membuat PR, pastikan:
- Project bisa dibuka di Live Server.
- Halaman yang diubah tidak error.
- Link antar halaman berjalan.
- Tampilan tidak rusak.
- Tidak ada file tidak penting yang ikut commit.