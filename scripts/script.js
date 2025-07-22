
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}


async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


function displayProducts(products) {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.style.animationDelay = `${index * 0.1}s`;
    productCard.innerHTML = `
                    <img src="${product.image}" alt="${
      product.title
    }" loading="lazy">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${
                      product.id
                    }">Add to Cart</button>
                `;
    productsGrid.appendChild(productCard);
  });
}


async function searchProducts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const products = await fetchProducts();
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts.length ? filteredProducts : products);
}


document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = parseInt(e.target.dataset.id);
    // Fetch all products (from cache or API)
    let products = window._productsCache;
    if (!products) {
      products = await fetchProducts();
      window._productsCache = products;
    }
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // Check if already in cart
    let found = false;
    for (let item of cart) {
      if (item.id === productId) {
        item.quantity = (item.quantity || 1) + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    e.target.textContent = "Added!";
    e.target.style.backgroundColor = "#27ae60";
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
      e.target.style.backgroundColor = "#2ecc71";
    }, 1000);
  }
  if (e.target.id === "search-btn") {
    searchProducts();
  }

  if (e.target.classList.contains("logout")) {
    localStorage.clear();
    window.location.href = "login.html";
  }
});


(async function init() {
  updateCartCount();
  const products = await fetchProducts();
  displayProducts(products);
})();


document.addEventListener('click', function(e) {
        var dropdown = document.getElementById('profile-dropdown');
        if (!dropdown) return;
        if (!e.target.closest('.dropdown')) {
          dropdown.classList.remove('show');
          dropdown.style.display = 'none';
        } else if (dropdown.classList.contains('show')) {
          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      });

       const toggle = document.getElementById('navbar-toggle');
      const menu = document.getElementById('navbar-menu');
      if(toggle && menu) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          menu.classList.toggle('show-menu');
        });
      }
      
      document.addEventListener('click', function(e) {
       
        var dropdown = document.getElementById('profile-dropdown');
        if (dropdown) {
          if (!e.target.closest('.dropdown')) {
            dropdown.classList.remove('show');
            dropdown.style.display = 'none';
          } else if (dropdown.classList.contains('show')) {
            dropdown.style.display = 'block';
          } else {
            dropdown.style.display = 'none';
          }
        }
         
        if (menu && !e.target.closest('.navbar')) {
          menu.classList.remove('show-menu');
        }
      });