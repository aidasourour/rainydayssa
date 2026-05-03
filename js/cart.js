const container = document.querySelector("#cart-container");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countElement = document.querySelector("#cart-count");

  if (!countElement) return;

  if (cart.length === 0) {
    countElement.textContent = "";
  } else {
    countElement.textContent = `(${cart.length})`;
  }
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>You have not added any products yet.</p>
        <a href="products.html">Continue Shopping</a>
      </div>
    `;

    subtotalElement.textContent = "$0.00";
    totalElement.textContent = "$0.00";
    updateCartCount();
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    const price = Number(product.price);
    total += price;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-image">

        <div class="cart-info">
          <h2>${product.title}</h2>
          <p class="cart-size">Size: <strong>${product.size || "Not selected"}</strong></p>
          <strong>$${price.toFixed(2)}</strong>
        </div>

        <button type="button" class="removeBtn" data-index="${index}">
          Remove
        </button>
      </div>
    `;
  });

  subtotalElement.textContent = `$${total.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  updateCartCount();
}

container.addEventListener("click", function (event) {
  if (event.target.classList.contains("removeBtn")) {
    const index = event.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
  }
});

loadCart();