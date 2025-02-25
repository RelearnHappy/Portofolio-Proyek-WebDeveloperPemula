// Product filtering logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Remove 'active' class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to clicked button
        button.classList.add('active');

        // Filter products
        document.querySelectorAll('.product-item').forEach(product => {
            if (filter === 'all' || product.classList.contains(filter)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// Simple cart functionality
let cartCount = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.querySelector('nav ul li:nth-child(3) a');
    cartItems.textContent = `Cart (${cartCount})`;
}