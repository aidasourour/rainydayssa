import { getProduct } from "./api.js";

// Elements
const container = document.querySelector("#product-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Display product
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

        ${
          product.discountedPrice < product.price
            ? `<p style="color: green;">Discount: $${product.discountedPrice}</p>`
            : ""
        }

        <button id="addToCart">Add to Cart</button>
      </div>
    `;

    // Add to cart button
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

// Add to cart function
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

// Show popup
function showCartPopup() {
  const popup = document.querySelector("#cart-popup");
  if (popup) {
    popup.classList.remove("hidden");
  }
}

// Close popup
document.addEventListener("click", (e) => {
  if (e.target.id === "close-popup" || e.target.id === "continue-shopping") {
    document.querySelector("#cart-popup").classList.add("hidden");
  }
});

// Run
displayProduct();