import { getProducts } from "./api.js";

const productsContainer = document.querySelector("#products-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

let allProducts = [];

async function displayProducts() {
  try {
    loading.style.display = "block";
    allProducts = await getProducts();
    loading.style.display = "none";
    renderProducts(allProducts);
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Could not load products.";
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const price = product.discountedPrice < product.price ? product.discountedPrice : product.price;

    productsContainer.innerHTML += `
      <div class="product-card">
        <a href="jacket.html?id=${product.id}" class="product-card-link">
          <div class="product-image-box">
            <img src="${product.image.url}" alt="${product.image.alt}">
          </div>
          <div class="product-card-info">
            <h2>${product.title}</h2>
            <p class="product-price">$${Number(price).toFixed(2)}</p>
          </div>
        </a>
      </div>
    `;
  });
}

document.querySelectorAll(".filter-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    if (filter === "all") {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) => product.gender === filter);
      renderProducts(filtered);
    }
  });
});

displayProducts();