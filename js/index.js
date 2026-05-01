import { getProducts } from "./api.js";

const productsContainer = document.querySelector("#products-container");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");

async function displayProducts() {
  try {
    const products = await getProducts();

    loading.style.display = "none";
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      productsContainer.innerHTML += `
        <div class="product-card">
     <img src="${product.image.url}" alt="${product.image.alt}">
          <h2>${product.title}</h2>
          <p>${product.description.substring(0, 80)}...</p>
          <p>Price: $${product.price}</p>
          <a href="jacket.html?id=${product.id}">View product</a>
        </div>
      `;
    });
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Sorry, we could not load the products.";
  }
}

displayProducts();