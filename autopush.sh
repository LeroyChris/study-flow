#!/bin/bash

# ==========================================
# CONFIGURATION
# ==========================================
MAIN_DIR="fitur"

# Fungsi untuk mendeteksi folder fitur mana yang sedang diubah
deteksi_fitur() {
    DETECTED_FEATURE=""
    while IFS= read -r line; do
        file_path="${line:3}"
        if [[ "$file_path" =~ ^$MAIN_DIR/ ]]; then
            DETECTED_FEATURE=$(echo "$file_path" | cut -d'/' -f2)
            break # Ambil fitur pertama yang terdeteksi terubah
        fi
    done < <(git status --porcelain)
    echo "$DETECTED_FEATURE"
}

# Fungsi untuk melakukan auto-switching jika tidak cocok
auto_switch_proteksi() {
    local fitur_aktif=$1
    local branch_aktif=$2
    
    if [ -n "$fitur_aktif" ]; then
        if ! echo "$branch_aktif" | grep -iq "$fitur_aktif"; then
            echo "======================================================="
            echo "[⚠️ WARNING] CABANG TIDAK COCOK SAMA KODE ANDA!"
            echo "Anda mengubah folder [$fitur_aktif] tapi di branch [$branch_aktif]"
            echo "======================================================="
            echo "[⚙️ PROSES] Mengamankan kode & pindah otomatis ke [$fitur_aktif]..."
            echo "-------------------------------------------------------"
            
            git stash > /dev/null 2>&1
            if git checkout "$fitur_aktif" > /dev/null 2>&1; then
                echo "[✓] Berhasil pindah ke branch lokal [$fitur_aktif]"
            else
                git checkout -b "$fitur_aktif" > /dev/null 2>&1
                echo "[✓] Membuat & pindah ke branch baru [$fitur_aktif]"
            fi
            git stash pop > /dev/null 2>&1
            echo "======================================================="
            sleep 2
        fi
    fi
}

# LOOP UTAMA DASHBOARD
while true; do
    clear
    # Ambil status git terbaru di setiap loop
    CURRENT_BRANCH=$(git branch --show-current)
    FITUR_TERDETEKSI=$(deteksi_fitur)
    
    echo "======================================================="
    echo "         🚀 STUDY-FLOW GIT INTERACTIVE CLI v2.0         "
    echo "======================================================="
    echo "  📍 Branch Saat Ini : [$CURRENT_BRANCH]"
    echo "  📁 Fitur Terdeteksi: [${FITUR_TERDETEKSI:-Tidak Ada / Root}]"
    echo "======================================================="
    echo "  Silakan pilih menu (Ketik angka 1-5):"
    echo "  1) 📤 Safe Push ke GitHub"
    echo "  2) 📥 Pull Terupdate"
    echo "  3) 🔍 Cek Status File (Git Status)"
    echo "  4) 🔀 Switch Branch Manual"
    echo "  5) ❌ Keluar"
    echo "======================================================="
    echo ""
    
    read -p "User: " pilihan
    echo ""

    case $pilihan in
        1)
            # Jalankan proteksi cek kecocokan folder vs branch sebelum push
            FITUR_TERDETEKSI=$(deteksi_fitur)
            CURRENT_BRANCH=$(git branch --show-current)
            auto_switch_proteksi "$FITUR_TERDETEKSI" "$CURRENT_BRANCH"
            
            # Update data branch setelah proteksi (jika tadinya ada auto-switch)
            CURRENT_BRANCH=$(git branch --show-current)
            
            clear
            echo "======================================================="
            echo "                  KONFIRMASI AKHIR PUSH                "
            echo "======================================================="
            echo "  Target Branch: [$CURRENT_BRANCH]"
            echo "-------------------------------------------------------"
            git status -s
            echo "======================================================="
            echo -n "[KONFIRMASI] Yakin ingin push ke GitHub? (y/n): "
            read -n 1 konfirm
            echo ""
            
            if [[ "$konfirm" == "y" || "$konfirm" == "Y" ]]; then
                echo "[PROSES] Memulai sinkronisasi..."
                git add .
                git diff --quiet --staged || git commit -m "Tim Push: $(date '+%Y-%m-%d %H:%M:%S') pada fitur ${FITUR_TERDETEKSI:-root}"
                git push origin "$CURRENT_BRANCH"
                echo "======================================================="
                echo "[✓] PUSH SUKSES!"
            else
                echo "[!] Push dibatalkan."
            fi
            read -n 1 -s -p "Tekan tombol apa saja untuk kembali ke Menu..."
            ;;
            
        2)
            echo "[PROSES] Menarik data terbaru dari GitHub..."
            git pull origin "$CURRENT_BRANCH"
            echo "======================================================="
            read -n 1 -s -p "Tekan tombol apa saja untuk kembali ke Menu..."
            ;;
            
        3)
            clear
            echo "======================================================="
            echo "                 STATUS PERUBAHAN FILE                 "
            echo "======================================================="
            git status
            echo "======================================================="
            read -n 1 -s -p "Tekan tombol apa saja untuk kembali ke Menu..."
            ;;
            
        4)
            clear
            echo "======================================================="
            echo "                  DAFTAR BRANCH LOKAL                  "
            echo "======================================================="
            git branch
            echo "======================================================="
            read -p "Masukkan nama branch tujuan Anda: " branch_tujuan
            
            # Pindah branch dengan aman menggunakan stash agar kerjaan tidak hilang
            git stash > /dev/null 2>&1
            if git checkout "$branch_tujuan"; then
                echo "[✓] Berhasil pindah ke branch [$branch_tujuan]"
            else
                echo "[X] Gagal pindah branch. Pastikan namanya benar."
            fi
            git stash pop > /dev/null 2>&1
            sleep 2
            ;;
            
        5)
            echo "Keluar dari sistem. Selamat lanjut coding! 👍"
            sleep 1
            exit 0
            ;;
            
        *)
            echo "[❌] Pilihan salah! Masukkan angka 1 sampai 5."
            sleep 1.5
            ;;
    esac
done