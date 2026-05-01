import { getProduct } from "./api.js";

const container = document.querySelector("#product-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function displayProduct() {
  if (!id) {
    loading.style.display = "none";
    errorMessage.textContent = "No product ID found in the URL.";
    return;
  }

  try {
    const product = await getProduct(id);

    loading.style.display = "none";

    container.innerHTML = `
      <div class="product-detail">
        <img src="${product.image.url}" alt="${product.image.alt}">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p>$${product.discountedPrice}</p>
        <button id="addToCart">Add to cart</button>
      </div>
    `;

    document.querySelector("#addToCart").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      showCartPopup();
    });
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = `Failed to load product: ${error.message}`;
    console.error(error);
  }
}

displayProduct();
function showCartPopup() {
  document.querySelector("#cart-popup").classList.remove("hidden");
}

document.querySelector("#close-popup").addEventListener("click", () => {
  document.querySelector("#cart-popup").classList.add("hidden");
});

document.querySelector("#continue-shopping").addEventListener("click", () => {
  document.querySelector("#cart-popup").classList.add("hidden");
});