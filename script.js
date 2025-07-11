





document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageSelect = document.getElementById("language-select");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  languageSelect?.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.textContent = el.getAttribute(`data-${selectedLang}`);
    });
  });

  // PRODUCT PAGE Logic
  const productGrid = document.getElementById("productGrid");
  const uploadForm = document.getElementById("uploadForm");
  const searchInput = document.getElementById("searchInput");
  const previewContainer = document.getElementById("previewContainer");
  let products = [];

  if (uploadForm) {
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

    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("productName").value;
      const price = document.getElementById("productPrice").value;
      const image = document.getElementById("productImage").files[0];
      if (!name || !price || !image) return;

      const reader = new FileReader();
      reader.onload = () => {
        const product = { name, price, image: reader.result };
        products.push(product);
        renderProducts();
        uploadForm.reset();
        previewContainer.innerHTML = '';
      };
      reader.readAsDataURL(image);
    });

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
          <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        productGrid.appendChild(card);
      });
    }

    searchInput.addEventListener("input", renderProducts);
  }

  // CART Logic
  const showDeliveryBtn = document.getElementById("showDelivery");
  const deliveryForm = document.getElementById("deliveryForm");
  const clearCartBtn = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (showDeliveryBtn && deliveryForm) {
    showDeliveryBtn.addEventListener("click", () => {
      deliveryForm.style.display = "flex";
      showDeliveryBtn.disabled = true;
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });
  }

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
            <p>$${parseFloat(item.price).toFixed(2)}</p>
          </div>
          <button class="cart-item-remove" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += parseFloat(item.price);
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;

      document.querySelectorAll(".cart-item-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });
      });
    }
  }

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

// Global Add to Cart function
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}






sendBtn.addEventListener('click', () => {
  const userMsg = chatInput.value.trim().toLowerCase();
  if (userMsg === '') return;
  addMessage(userMsg, true);
  chatInput.value = '';

  setTimeout(() => {
    let botReply = '';

    if (userMsg.includes('refund')) {
      botReply = "If you'd like a refund, please visit your order history and select 'Request Refund'.";
    } else if (userMsg.includes('delivery') || userMsg.includes('shipping')) {
      botReply = "Delivery usually takes 2–5 business days. Please check your order status under 'My Orders'.";
    } else if (userMsg.includes('broken') || userMsg.includes('damage')) {
      botReply = "We're sorry to hear that! Please upload a photo and we'll handle the return.";
    } else if (userMsg.includes('late') || userMsg.includes('delay')) {
      botReply = "Sometimes deliveries are delayed due to weather or traffic. We appreciate your patience.";
    } else {
      botReply = "Thanks for reaching out. We'll forward your issue to our support team.";
    }

    addMessage(botReply, false);
  }, 800);
});
