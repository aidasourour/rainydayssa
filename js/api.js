export const API_URL = "https://v2.api.noroff.dev/rainy-days";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not fetch products");
  }

  const result = await response.json();
  return result.data;
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Could not fetch product");
  }

  const result = await response.json();
  return result.data;
}