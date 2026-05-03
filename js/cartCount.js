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

updateCartCount();