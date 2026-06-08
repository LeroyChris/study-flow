// 1. Definisikan daftar kata yang akan muncul bergantian
const WORDS = ['focus', 'learn', 'grow', 'achieve'];

// 2. Siapkan variabel status (state) untuk melacak posisi teks
let wordIdx = 0;       // Melacak kata ke-berapa saat ini
let display = '';      // Teks yang sedang tampil di layar
let deleting = false;  // Status apakah sedang menghapus teks atau mengetik

// 3. Ambil elemen HTML berdasarkan ID yang sudah dibuat tadi
const textElement = document.getElementById('typewriter-text');

// 4. Fungsi utama untuk memproses animasi efek mengetik
function handleTypewriter() {
  const currentWord = WORDS[wordIdx];
  
  // Tentukan kecepatan durasi (menghapus lebih cepat daripada mengetik)
  let delay = deleting ? 70 : 130;

  if (!deleting) {
    // KONDISI MENGETIK: Jika teks di layar masih lebih pendek dari kata aslinya
    if (display.length < currentWord.length) {
      display = currentWord.slice(0, display.length + 1);
    } else {
      // Jika kata sudah terketik penuh, jeda selama 1.8 detik sebelum mulai menghapus
      delay = 1800;
      deleting = true;
    }
  } else {
    // KONDISI MENGHAPUS: Jika teks masih ada di layar, hapus satu huruf dari belakang
    if (display.length > 0) {
      display = display.slice(0, -1);
    } else {
      // Jika kata sudah terhapus habis, ganti ke kata berikutnya di dalam array
      deleting = false;
      wordIdx = (wordIdx + 1) % WORDS.length;
    }
  }

  // Perbarui tampilan teks di layar browser
  textElement.textContent = display;

  // Jalankan fungsi ini kembali secara berulang-ulang berdasarkan jeda waktu (delay)
  setTimeout(handleTypewriter, delay);
}

// 5. Jalankan fungsi untuk pertama kali saat halaman web berhasil dibuka
document.addEventListener('DOMContentLoaded', handleTypewriter);
