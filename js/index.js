import { getProducts } from "./api.js";

const container = document.querySelector("#products-container");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");

let selectedProduct = null;

async function displayProducts() {
  try {
    const products = await getProducts();
    loading.style.display = "none";

    container.innerHTML = "";

    products.forEach(product => {
      container.innerHTML += `
        <div class="product-card">
          <a href="jacket.html?id=${product.id}">
            <img src="${product.image.url}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
          </a>

          <button class="quick-add-btn" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });

    document.querySelectorAll(".quick-add-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedProduct = products.find(p => p.id === btn.dataset.id);
        document.querySelector("#size-popup").classList.remove("hidden");
      });
    });

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Failed to load products.";
    console.error(err);
  }
}

document.querySelector("#confirm-size-btn").addEventListener("click", () => {
  const size = document.querySelector("#popup-size-select").value;

  if (!size) {
    alert("Select a size");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: selectedProduct.id,
    title: selectedProduct.title,
    price: selectedProduct.price,
    image: selectedProduct.image.url,
    size: size
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelector("#size-popup").classList.add("hidden");
});

document.querySelector("#close-size-popup").addEventListener("click", () => {
  document.querySelector("#size-popup").classList.add("hidden");
});

displayProducts();