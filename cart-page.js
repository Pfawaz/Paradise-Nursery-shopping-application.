// Cart page functionality
document.addEventListener('DOMContentLoaded', () => {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    
    let totalItems = 0;
    let totalCost = 0;

    cartItemsContainer.innerHTML = cart.map((item, index) => {
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;

        return `
            <div class="cart-item">
                <img src="images/${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="decrement" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increment" data-index="${index}">+</button>
                        <button class="delete-btn" data-index="${index}">Remove</button>
                    </div>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    // Update totals
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);

    // Add event listeners for quantity controls
    document.querySelectorAll('.decrement, .increment, .delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const cart = getCart();
            
            if (e.target.classList.contains('delete-btn')) {
                cart.splice(index, 1);
            } else {
                if (e.target.classList.contains('increment')) {
                    cart[index].quantity++;
                } else {
                    cart[index].quantity--;
                    if (cart[index].quantity < 1) cart.splice(index, 1);
                }
            }

            saveCart(cart);
            location.reload(); // Refresh to update display
        });
    });
});
