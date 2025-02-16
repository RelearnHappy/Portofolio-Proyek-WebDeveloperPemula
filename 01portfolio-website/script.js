// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Simple validation
    if (!name || !email || !message) {
      alert('Harap isi semua kolom.');
      return;
    }
  
    // Simulate form submission
    alert(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
    this.reset(); // Clear the form
  });