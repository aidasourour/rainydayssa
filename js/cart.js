const container = document.querySelector("#cart-container");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven’t added anything yet.</p>
        <a href="products.html">Continue Shopping</a>
      </div>
    `;

    subtotalElement.textContent = "$0";
    totalElement.textContent = "$0";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach((product, index) => {
    const price =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;

    total += price;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${product.image.url}" alt="${product.image.alt}" class="cart-image">

        <div class="cart-info">
          <h2>${product.title}</h2>
          <p>${product.description.substring(0, 80)}...</p>
          <strong>$${price}</strong>
        </div>

        <button class="removeBtn" data-index="${index}">Remove</button>
      </div>
    `;
  });

  subtotalElement.textContent = `$${total.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll(".removeBtn").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const index = event.target.dataset.index;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

loadCart();