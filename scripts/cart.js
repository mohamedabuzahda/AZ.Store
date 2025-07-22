let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productsCache = [];

function updateCartCount() {
  let count = 0;
  for (let item of cart) {
    count += item.quantity || 1;
  }
  let el = document.getElementById("cart-count");

  if (!el && window.parent && window.parent !== window) {
    try {
      el = window.parent.document.getElementById("cart-count");
    } catch {}
  }

  if (el) el.textContent = count;
}

async function fetchProducts() {
  if (productsCache.length) return productsCache;
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    productsCache = await response.json();
    return productsCache;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function getCartDetails(products) {
  return cart
    .map(item => {
      const latest = products.find(p => p.id === item.id);
      if (!latest) return null;
      return {
        ...item,
        title: latest.title,
        price: latest.price,
        image: latest.image,
        quantity: item.quantity || 1,
      };
    })
    .filter(Boolean); 
}

function displayCartTable(cartItems) {
  const tbody = document.getElementById("cart-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  cartItems.forEach(item => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.title}" style="width:100px;height:100px;object-fit:contain;"></td>
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span class="cart-qty">${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="remove-from-cart" data-id="${item.id}">X</button></td>
    `;

    tbody.appendChild(row);
  });

  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("click", function (e) {
  const id = parseInt(e.target.dataset.id);

  
  if (e.target.classList.contains("remove-from-cart")) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  // Increase quantity
  if (e.target.classList.contains("plus")) {
    for (let item of cart) {
      if (item.id === id) {
        item.quantity = (item.quantity || 1) + 1;
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  
  if (e.target.classList.contains("minus")) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if ((cart[i].quantity || 1) > 1) {
          cart[i].quantity--;
        } else {
          cart.splice(i, 1); 
        }
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
});

async function renderCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  const products = await fetchProducts();
  const cartItems = getCartDetails(products);
  displayCartTable(cartItems);
}

renderCart();
