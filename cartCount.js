const cartCount = document.querySelector("#cart-count");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cartCount) {
  cartCount.textContent = cart.length;
}