import { getProduct } from "./api.js";

const container = document.querySelector("#product-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function displayProduct() {
  try {
    const product = await getProduct(id);

    loading.style.display = "none";

    container.innerHTML = `
      <div class="product-detail">
        <img src="${product.image.url}" alt="${product.image.alt}">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p><strong>Price: $${product.price}</strong></p>

        <label for="sizeSelect">Choose size:</label>
        <select id="sizeSelect" class="size-select">
          <option value="">Select size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <button id="addToCart">Add to Cart</button>
      </div>
    `;

    document.querySelector("#addToCart").addEventListener("click", () => {
      const size = document.querySelector("#sizeSelect").value;

      if (!size) {
        alert("Please select a size");
        return;
      }

      addToCart(product, size);
      showCartPopup();
    });

  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Failed to load product.";
    console.error(error);
  }
}

function addToCart(product, size) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const price =
    product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;

  cart.push({
    id: product.id,
    title: product.title,
    price: price,
    image: product.image.url,
    size: size
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

function showCartPopup() {
  const popup = document.querySelector("#cart-popup");

  if (popup) {
    popup.classList.remove("hidden");
  }
}

document.addEventListener("click", (event) => {
  if (event.target.id === "close-popup" || event.target.id === "continue-shopping") {
    const popup = document.querySelector("#cart-popup");

    if (popup) {
      popup.classList.add("hidden");
    }
  }
});

displayProduct();