const container = document.querySelector("#cart-container");
const totalContainer = document.querySelector("#total");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    totalContainer.textContent = "";
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
      <img 
        src="${product.image.url}" 
        alt="${product.image.alt}" 
        class="cart-item-image"
      >

      <div class="cart-item-info">
        <h3>${product.title}</h3>
        <p>$${price}</p>
        <button data-index="${index}" class="removeBtn">Remove</button>
      </div>
    </div>
  `;
});

  totalContainer.textContent = "Total: $" + total;

  // remove buttons
  document.querySelectorAll(".removeBtn").forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const index = event.target.dataset.index;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

loadCart();