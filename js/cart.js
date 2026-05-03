const container = document.querySelector("#cart-container");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>You have not added any products yet.</p>
        <a href="products.html">Continue Shopping</a>
      </div>
    `;

    if (subtotalElement) subtotalElement.textContent = "$0.00";
    if (totalElement) totalElement.textContent = "$0.00";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach((product, index) => {
    const price = Number(product.price);
    total += price;

container.innerHTML += `
  <div class="cart-item">
    <img 
      src="${product.image}" 
      alt="${product.title}" 
      class="cart-image"
    >

    <div class="cart-info">
      <h2>${product.title} (${product.size || "No size"})</h2>

      <p class="cart-size">
        Size: <strong>${product.size || "Not selected"}</strong>
      </p>

      <strong>$${Number(product.price).toFixed(2)}</strong>
    </div>

    <button class="removeBtn" data-index="${index}">
      Remove
    </button>
  </div>
`;
  });

  if (subtotalElement) subtotalElement.textContent = `$${total.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".removeBtn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.dataset.index;
      removeItem(index);
    });
  });
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

loadCart();