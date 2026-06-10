
//#region Efek Mengetik (Typewriter Effect)

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

//#endregion

//#region Hitung otomatis
function startDynamicCountAnimation() {
  const counters = document.querySelectorAll('.count-number');
  const totalDuration = 2500; // Durasi dinaikkan ke 2.5 detik agar perubahan K ke M terlihat jelas

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    // Ambil elemen pasangannya untuk mengubah huruf K+/M+ secara dinamis
    const suffixElement = counter.nextElementSibling; 
    
    const startValue = 0;
    let startTime = null;

    function updateCount(currentTime) {
      if (!startTime) startTime = currentTime;
      
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      
      // Nilai mentah angka saat ini (contoh: berputar dari 0 sampai 500.000)
      const currentValue = Math.floor(progress * (target - startValue) + startValue);
      
      // LOGIKA TRANSISI K+ KE M+
      if (currentValue >= 1000) {
        // Jika angka sudah 1.000 ke atas, ubah format ke Jutaan (M)
        const millionValue = currentValue / 1000;
        
        // Jika hasilnya ada desimal (seperti 2.0M), tampilkan 1 angka di belakang koma (.toFixed(1))
        // Jika angka bulat (seperti 500M), tampilkan tanpa desimal
        counter.textContent = millionValue % 1 === 0 ? millionValue : millionValue.toFixed(1);
        if (suffixElement) suffixElement.textContent = 'M+';
      } else {
        // Jika angka masih kecil, tetap tampilkan format Ribuan (K)
        counter.textContent = currentValue;
        if (suffixElement) suffixElement.textContent = 'K+';
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        // Sesi Final: Pastikan angka berhenti tepat di angka target desain Anda
        if (target >= 1000) {
          const finalMillion = target / 1000;
          counter.textContent = finalMillion % 1 === 0 ? finalMillion : finalMillion.toFixed(1);
          if (suffixElement) suffixElement.textContent = 'M+';
        } else {
          counter.textContent = target;
          if (suffixElement) suffixElement.textContent = 'K+';
        }
      }
    }

    requestAnimationFrame(updateCount);
  });
}

document.addEventListener('DOMContentLoaded', startDynamicCountAnimation);


//#endregion