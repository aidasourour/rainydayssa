import { getProducts } from "./api.js";

const productsContainer = document.querySelector("#products-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

let selectedProduct = null;

async function displayProducts() {
  try {
    loading.style.display = "block";

    const products = await getProducts();

    loading.style.display = "none";
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const price =
        product.discountedPrice < product.price
          ? product.discountedPrice
          : product.price;

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

          <button type="button" class="quick-add-btn" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });

    document.querySelectorAll(".quick-add-btn").forEach((button) => {
      button.addEventListener("click", () => {
        selectedProduct = products.find((product) => product.id === button.dataset.id);
        document.querySelector("#size-popup").classList.remove("hidden");
      });
    });

    document.querySelectorAll(".filter-buttons button").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        if (filter === "all") {
          renderFilteredProducts(products);
        } else {
          const filteredProducts = products.filter((product) => product.gender === filter);
          renderFilteredProducts(filteredProducts);
        }
      });
    });

  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Could not load products.";
    console.error(error);
  }
}

function renderFilteredProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const price =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;

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

        <button type="button" class="quick-add-btn" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
}

document.querySelector("#confirm-size-btn").addEventListener("click", () => {
  const size = document.querySelector("#popup-size-select").value;

  if (!size) {
    alert("Please select a size");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const price =
    selectedProduct.discountedPrice < selectedProduct.price
      ? selectedProduct.discountedPrice
      : selectedProduct.price;

  cart.push({
    id: selectedProduct.id,
    title: selectedProduct.title,
    price: price,
    image: selectedProduct.image.url,
    size: size
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelector("#size-popup").classList.add("hidden");
  document.querySelector("#popup-size-select").value = "";
});

document.querySelector("#close-size-popup").addEventListener("click", () => {
  document.querySelector("#size-popup").classList.add("hidden");
});

displayProducts();