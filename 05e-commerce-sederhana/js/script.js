// Product filtering logic
// Event listener yang ditambahkan ke semua tombol filter ('filter-btn').
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;  // Mengambil nilai filter dari atribut 'data-filter' pada tombol.

        // Menghapus kelas 'active' dari semua tombol filter.
        // Hal ini dilakukan agar hanya satu tombol filter saja yang memiliki kelas 'active' (tombol yang diklik).
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

        // Menambahkan kelas 'active' pada tombol yang baru saja diklik, 
        // sehingga pengguna tahu filter mana yang sedang aktif.
        button.classList.add('active');

        // Filter produk berdasarkan jenis yang dipilih.
        document.querySelectorAll('.product-item').forEach(product => {
            // Jika filter adalah 'all', atau jika elemen produk memiliki kelas yang sesuai dengan filter,
            // maka produk tersebut akan ditampilkan. Selain itu, produk akan disembunyikan.
            if (filter === 'all' || product.classList.contains(filter)) {
                product.style.display = 'block';  // Tampilkan produk
            } else {
                product.style.display = 'none';  // Sembunyikan produk
            }
        });
    });
});

// Simple cart functionality
let cartCount = 0;  // Variabel untuk menyimpan jumlah item dalam keranjang belanja.

// Event listener untuk menambahkan item ke keranjang belanja ketika tombol 'add-to-cart' diklik.
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;  // Menambahkan 1 ke jumlah item dalam keranjang saat tombol ditekan.
        updateCart();  // Memperbarui tampilan jumlah item di keranjang.
    });
});

// Fungsi ini digunakan untuk memperbarui jumlah item di keranjang belanja di antarmuka pengguna.
function updateCart() {
    // Memilih elemen HTML yang menunjukkan jumlah item di keranjang (biasanya ada di navigasi halaman).
    const cartItems = document.querySelector('nav ul li:nth-child(3) a');
    
    // Memperbarui teks elemen tersebut dengan jumlah item terbaru dalam keranjang.
    cartItems.textContent = `Cart (${cartCount})`;
}
