// DOM Elements
// Mengambil elemen-elemen yang dibutuhkan dari DOM menggunakan ID dan class tertentu.
const todoForm = document.getElementById('todo-form');  // Formulir input todo
const todoInput = document.getElementById('todo-input');  // Input field untuk menambahkan todo baru
const todoList = document.getElementById('todo-list');  // Daftar todo yang ditampilkan di halaman
const filterButtons = document.querySelectorAll('.filter-btn');  // Tombol filter untuk menampilkan jenis-jenis todo (aktif, selesai, dll.)

// Array todos digunakan untuk menyimpan daftar todo. 
// Jika ada data todo yang tersimpan di localStorage, kita ambil, jika tidak array akan kosong.
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Fungsi ini digunakan untuk menyimpan daftar todo ke localStorage,
// sehingga data tetap ada meskipun browser direfresh atau ditutup.
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi ini digunakan untuk merender daftar todo sesuai dengan filter yang dipilih ('all', 'active', atau 'completed').
function renderTodos(filter = 'all') {
  // Membersihkan isi daftar todo saat ini agar bisa diperbarui dengan daftar terbaru.
  todoList.innerHTML = '';

  let filteredTodos;
  
  // Menerapkan filter berdasarkan status todo: aktif, selesai, atau semua.
  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);  // Filter todo yang masih aktif (belum selesai)
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);  // Filter todo yang sudah selesai
  } else {
    filteredTodos = todos;  // Tidak ada filter, tampilkan semua todo
  }

  // Melakukan iterasi melalui daftar todo yang telah difilter
  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');  // Membuat elemen <li> untuk setiap todo
    li.textContent = todo.text;  // Menetapkan teks dari todo

    // Jika todo sudah selesai (completed), maka tambahkan kelas CSS "completed" untuk styling visual.
    if (todo.completed) {
      li.classList.add('completed');
    }

    // Membuat tombol hapus untuk menghapus todo dari daftar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';  // Nama tombol untuk menghapus
    
    // Menambahkan event listener pada tombol hapus. Ketika diklik, todo yang bersangkutan akan dihapus dari array todos.
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);  // Menghapus todo berdasarkan indeksnya
      saveTodos();  // Simpan perubahan ke localStorage
      renderTodos(filter);  // Render ulang daftar todo yang telah diperbarui
    });

    // Menambahkan event listener untuk menandai todo sebagai selesai/tidak selesai saat elemen todo diklik
    li.addEventListener('click', () => {
      todo.completed = !todo.completed;  // Toggle status completed
      saveTodos();  // Simpan perubahan ke localStorage
      renderTodos(filter);  // Render ulang daftar todo yang telah diperbarui
    });

    // Memasukkan tombol hapus ke dalam elemen <li>
    li.appendChild(deleteButton);
    // Memasukkan elemen <li> ke dalam daftar todo
    todoList.appendChild(li);
  });
}

// Event listener ketika formulir submit digunakan untuk menambahkan todo baru.
todoForm.addEventListener('submit', event => {
  event.preventDefault();  // Mencegah perilaku default form (refresh page)

  // Mengambil nilai input dari form, lalu menghilangkan spasi di awal/akhir string.
  const todoText = todoInput.value.trim();
  
  // Validasi input - hanya tambahkan todo jika input tidak kosong.
  if (todoText !== '') {
    todos.push({ text: todoText, completed: false });  // Menambahkan todo baru ke array todos dengan status belum selesai.
    saveTodos();  // Simpan daftar todo yang diperbarui ke localStorage
    renderTodos();  // Render ulang daftar todo
    todoInput.value = '';  // Mengosongkan input field setelah todo berhasil ditambahkan
  }
});

// Menambahkan event listener pada tombol-tombol filter.
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Menghapus kelas 'active' dari tombol filter yang sedang aktif.
    document.querySelector('.filter-btn.active').classList.remove('active');
    
    // Menambahkan kelas 'active' ke tombol filter yang baru saja diklik.
    button.classList.add('active');
    
    // Render ulang daftar todo berdasarkan filter yang dipilih.
    renderTodos(button.dataset.filter);
  });
});

// Fungsi ini dipanggil pertama kali untuk menampilkan daftar todo yang ada saat aplikasi dimuat.
renderTodos();
