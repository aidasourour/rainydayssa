function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;

  const countElement = document.querySelector("#cart-count");

  if (countElement) {
    countElement.textContent = count;
  }
}

updateCartCount();