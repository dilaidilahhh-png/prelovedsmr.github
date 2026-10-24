// // toggle class active

// const navbarUtama1 = document.querySelector

// ('.navbar-utama1')

// // ketika menu di klik

// document.querySelector ('#menu').
// onclick = () => {
//     navbarUtama1.classList.toggle('active');
// };

// const menu = document.querySelector('#menu')


// document.addEventListener('click', function(e) {

// if (!menu.contains(e.target) && !navbarUtama1.contains(e.target)) {
// navbarUtama1.classList.remove('active')
// }

// });

const menu = document.querySelector('#menu');
const navbarUtama1 = document.querySelector('.navbar-utama1'); // Hati-hati salah ketik titik (.) atau nama class!

// 2. Fungsi untuk Tombol Menu (Toggle Active)
// (Pastikan tombol #menu Anda sudah ada event click-nya di atas baris ini)
if (menu && navbarUtama1) {
    menu.onclick = () => {
        navbarUtama1.classList.toggle('active');
    };
}

// 3. Fungsi untuk Klik di Luar Menu (Untuk menutup navbar)
document.addEventListener('click', function(e) {
    // Tambahkan validasi "if" untuk memastikan elemennya memang ada di halaman tersebut
    if (menu && navbarUtama1) {
        if (!menu.contains(e.target) && !navbarUtama1.contains(e.target)) {
            navbarUtama1.classList.remove('active');
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#myInput");
  const searchBtn = document.querySelector("#myBtn");
  const rekomendasiBox = document.querySelector("#rekomendasi-box");

  // DATABASE PRODUK: Tempat menyimpan kata kunci dan halaman tujuan
  // Anda tinggal menambah baris di sini jika produk bertambah
  const databaseProduk = [
    { nama: "Baju Kemeja Pria Keren", keywords: ["baju", "kemeja", "pria"], url: "baju-kemeja.html" },
    { nama: "Baju Kaos Polos Cotton", keywords: ["baju", "kaos", "polos"], url: "baju-kaos.html" },
    { nama: "Sepatu Sneakers Olahraga", keywords: ["sepatu", "sneakers", "lari"], url: "sepatu-olahraga.html" },
    { nama: "Topi Hitam Distro Keren", keywords: ["topi", "hitam", "distro"], url: "topi-hitam.html" }
  ];

  // 1. FUNGSI UNTUK MENAMPILKAN REKOMENDASI SAAT MENGETIK
  function tampilkanRekomendasi() {
    const kataKunci = searchInput.value.toLowerCase().trim();
    rekomendasiBox.innerHTML = ""; // Bersihkan rekomendasi sebelumnya

    if (kataKunci === "") {
      rekomendasiBox.style.display = "none";
      return;
    }

    // Filter produk berdasarkan nama atau kata kunci yang cocok
    const hasilFilter = databaseProduk.filter(item => {
      const cocokNama = item.nama.toLowerCase().includes(kataKunci);
      const cocokKeyword = item.keywords.some(kw => kw.includes(kataKunci));
      return cocokNama || cocokKeyword;
    });

    // Jika ada produk yang cocok, tampilkan kotak rekomendasi
    if (hasilFilter.length > 0) {
      hasilFilter.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = item.nama;
        
        // KETIKA REKOMENDASI DIKLIK: Langsung pindah halaman
        div.addEventListener("click", function () {
          window.location.href = item.url;
        });

        rekomendasiBox.appendChild(div);
      });
      rekomendasiBox.style.display = "block";
    } else {
      rekomendasiBox.style.display = "none";
    }
  }

  // 2. FUNGSI UNTUK TOMBOL CARI MANUAL ATAU TEKAN ENTER
  function cariManual() {
    const kataKunci = searchInput.value.toLowerCase().trim();
    if (kataKunci === "") return;

    // Cari produk pertama yang paling mendekati kata kunci
    const produkDitemukan = databaseProduk.find(item => {
      const cocokNama = item.nama.toLowerCase().includes(kataKunci);
      const cocokKeyword = item.keywords.some(kw => kw.includes(kataKunci));
      return cocokNama || cocokKeyword;
    });

    if (produkDitemukan) {
      window.location.href = produkDitemukan.url;
    } else {
      alert("Produk tidak ditemukan!");
    }
  }

  // EVENT LISTENERS
  if (searchInput) {
    searchInput.addEventListener("input", tampilkanRekomendasi);
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") cariManual();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", cariManual);
  }

  // TUTUP KOTAK REKOMENDASI JIKA PENGGUNA KLIK DI LUAR SEARCH BAR
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !rekomendasiBox.contains(e.target)) {
      rekomendasiBox.style.display = "none";
    }
  });
});


// Ambil elemen ikon search bawaan navbar-extra Anda
const iconSearch = document.querySelector("#search");
const searchContainer = document.querySelector(".search-container");
const myInput = document.querySelector("#myInput");

if (iconSearch && searchContainer) {
  iconSearch.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah link '#' melompat
    
    // Toggle class 'aktif' untuk memunculkan/menyembunyikan search bar
    searchContainer.classList.toggle("aktif");
    
    // Otomatis arahkan kursor ketik ke dalam input saat box muncul
    if (searchContainer.classList.contains("aktif")) {
      myInput.focus();
    }
  });

  // Tambahan: Tutup search bar HP jika user klik di luar area search bar
  document.addEventListener("click", function (e) {
    if (!iconSearch.contains(e.target) && !searchContainer.contains(e.target)) {
      searchContainer.classList.remove("aktif");
    }
  });
}