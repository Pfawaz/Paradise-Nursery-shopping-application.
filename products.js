const products = [
    { 
        id: 1, 
        name: 'Monstera Deliciosa', 
        price: 34.99, 
        category: 'Popular Plants', 
        image: 'monstera.jpg',
        description: 'Iconic split-leaf tropical plant'
    },
    { 
        id: 2, 
        name: 'Snake Plant', 
        price: 24.99, 
        category: 'Low Maintenance', 
        image: 'snake-plant.jpg',
        description: 'Air-purifying and drought-resistant'
    },
    { 
        id: 3, 
        name: 'Golden Pothos', 
        price: 19.99, 
        category: 'Trailing Plants', 
        image: 'pothos.jpg',
        description: 'Easy-care trailing vine for shelves'
    },
    { 
        id: 4, 
        name: 'Fiddle Leaf Fig', 
        price: 49.99, 
        category: 'Popular Plants', 
        image: 'fiddle-leaf.jpg',
        description: 'Statement tree with large leaves'
    },
    { 
        id: 5, 
        name: 'Zanzibar Gem', 
        price: 29.99, 
        category: 'Low Maintenance', 
        image: 'zanzibar.jpg',
        description: 'Nearly indestructible houseplant'
    },
    { 
        id: 6, 
        name: 'Mini Cactus Set', 
        price: 14.99, 
        category: 'Succulents', 
        image: 'cactus.jpg',
        description: 'Set of 3 small desert cacti'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    
    // Group products by category
    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Create category sections
    for (const [categoryName, productsInCategory] of Object.entries(categories)) {
        const categoryHTML = `
            <div class="category">
                <h3>${categoryName}</h3>
                <div class="products-grid">
                    ${productsInCategory.map(product => `
                        <div class="product-card">
                            <img src="images/${product.image}" alt="${product.name}">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <button class="add-to-cart" data-id="${product.id}">
                                Add to Cart
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
    }

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
            updateCartCount();
        });
    });
});
