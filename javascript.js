$(document).ready(function(){
    $('ul.tabs li a:first').addClass('active');
    $('.secciones article').hide();
    $('.secciones article:first').show();

    $('ul.tabs li a').click(function(){
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.secciones article').hide();

        var activeTab = $(this).attr('href');
        $(activeTab).show();
        return false;
    });
});

//FUNCIONES DEL CARRITO DE COMPRAS
let cart = [];
let total = 0;

function addToCart(product, price, imgSrc, size) {
    if (!size) {
        alert('Por favor, ingrese una talla.');
        return;
    }
    
    const existingProduct = cart.find(item => item.product === product && item.size === size);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const item = { product, price, imgSrc, size, quantity: 1 };
        cart.push(item);
    }
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.product}">
            ${item.product} (Talla: ${item.size}) - $${item.price} x ${item.quantity}
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
        `;
        cartItems.appendChild(cartItem);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.length;
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

function emptyCart() {
    cart = [];
    total = 0;
    updateCart();
}

function purchase() {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    
    const purchaseMessage = document.getElementById('purchase-message');
    purchaseMessage.textContent = '¡Gracias por su compra!';
    document.getElementById('purchase-modal').style.display = 'flex';
    emptyCart();
}

function closeModal() {
    document.getElementById('purchase-modal').style.display = 'none';
}

function removeFromCart(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    total += cart[index].price;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        total -= cart[index].price;
        updateCart();
    }
}