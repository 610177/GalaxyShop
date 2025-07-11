// === Theme Toggle ===
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Optional: change button icon
  themeToggle.textContent =
    document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// === Language Switch ===
const languageSelect = document.getElementById("language-select");

languageSelect.addEventListener("change", (e) => {
  const selectedLang = e.target.value;
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${selectedLang}`);
  });
});


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ShopGalaxy | Cart</title>
  <link rel="stylesheet" href="styles.css" />
  <script defer src="script.js"></script>
  <style>
    .cart-section {
      padding: 2rem;
    }

    .cart-container {
      max-width: 800px;
      margin: auto;
      background: var(--nav-bg);
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 1rem 0;
    }

    .cart-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .cart-item-info {
      flex: 1;
      margin-left: 1rem;
    }

    .cart-item-info h3 {
      margin: 0;
    }

    .cart-total {
      text-align: right;
      margin-top: 1.5rem;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .checkout-btn {
      margin-top: 1rem;
      display: block;
      width: 100%;
      padding: 0.75rem;
      background: var(--accent-color);
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="logo">ShopGalaxy</div>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li>
          <select id="language-select">
            <option value="en">English</option>
            <option value="my">မြန်မာ</option>
          </select>
        </li>
        <li>
          <button id="theme-toggle">🌙</button>
        </li>
      </ul>
      <button class="menu-toggle" id="menuToggle">☰</button>
    </nav>
  </header>

  <main>
    <section class="cart-section">
      <div class="cart-container">
        <h2>Your Shopping Cart</h2>
        <div id="cartItems">
          <!-- Cart items will be injected here -->
        </div>
        <div class="cart-total" id="cartTotal">Total: $0.00</div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </section>
  </main>
</body>
</html>
















//Product//
// === Existing Theme & Menu Toggle ===
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const languageSelect = document.getElementById("language-select");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

languageSelect.addEventListener("change", (e) => {
  const selectedLang = e.target.value;
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${selectedLang}`);
  });
});

// === PRODUCT PAGE LOGIC ===
const productGrid = document.getElementById("productGrid");
const uploadForm = document.getElementById("uploadForm");
const searchInput = document.getElementById("searchInput");
const previewContainer = document.getElementById("previewContainer");

let products = []; // will hold uploaded product objects

// 🖼️ Live Image Preview
document.getElementById("productImage").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewContainer.innerHTML = `<img src="${reader.result}" alt="Preview" />`;
    };
    reader.readAsDataURL(file);
  }
});

// 📦 Add New Product
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").files[0];

  if (!name || !price || !image) return;

  const reader = new FileReader();
  reader.onload = () => {
    const product = {
      name,
      price,
      image: reader.result,
    };
    products.push(product);
    renderProducts();
    uploadForm.reset();
    previewContainer.innerHTML = '';
  };
  reader.readAsDataURL(image);
});

// 🧹 Render Product Cards
function renderProducts() {
  productGrid.innerHTML = "";
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// 🔎 Live Search
searchInput.addEventListener("input", renderProducts);

// 🛒 Add to Cart (console only for now)
function addToCart(name, price) {
  console.log(`Added to cart: ${name} ($${price})`);
}




//cart//

document.addEventListener("DOMContentLoaded", () => {
  const showDeliveryBtn = document.getElementById("showDelivery");
  const deliveryForm = document.getElementById("deliveryForm");

  if (showDeliveryBtn && deliveryForm) {
    showDeliveryBtn.addEventListener("click", () => {
      deliveryForm.style.display = "flex";
      showDeliveryBtn.disabled = true; // Optional: prevent multiple clicks
    });
  }
});


//logic//
// ========== ADD TO CART (from products page) ==========
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// ========== RENDER CART ITEMS ==========
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartItemsContainer && cartTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
          </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += parseFloat(item.price);
      });
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Show delivery form
  const showDeliveryBtn = document.getElementById("showDelivery");
  const deliveryForm = document.getElementById("deliveryForm");

  if (showDeliveryBtn && deliveryForm) {
    showDeliveryBtn.addEventListener("click", () => {
      deliveryForm.style.display = "flex";
      showDeliveryBtn.disabled = true;
    });
  }

  // Clear cart
  const clearCartBtn = document.getElementById("clearCart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });
  }

  // Render cart items
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartItemsContainer && cartTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <button class="cart-item-remove" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += parseFloat(item.price);
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;

      // Remove item
      const removeButtons = document.querySelectorAll(".cart-item-remove");
      removeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });
      });
    }
  }

  // Checkout validation
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (deliveryForm && deliveryForm.style.display === "flex") {
        const name = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();

        if (!name || !phone || !address || !city) {
          alert("Please fill in all delivery details.");
          return;
        }
      }

      alert("Checkout successful!");
      localStorage.removeItem("cart");
      location.reload();
    });
  }
});
