import { getProducts } from "./api.js";

const productsContainer = document.querySelector("#products-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

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
          <img src="${product.image.url}" alt="${product.image.alt}">
          <h2>${product.title}</h2>
          <p>$${price}</p>
          <a href="jacket.html?id=${product.id}">View product</a>
        </div>
      `;
    });
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Could not load products.";
  }
}

displayProducts();