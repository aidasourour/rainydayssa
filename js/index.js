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

    addQuickAddEvents(products);

  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Could not load products.";
    console.error(error);
  }
}

function addQuickAddEvents(products) {
  const buttons = document.querySelectorAll(".quick-add-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      const selectedProduct = products.find((product) => product.id === productId);

      addToCart(selectedProduct);

      button.textContent = "Added!";
      button.classList.add("added");

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.remove("added");
      }, 1200);
    });
  });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const price =
    product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;

  cart.push({
    id: product.id,
    title: product.title,
    price: price,
    image: product.image.url
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

displayProducts();