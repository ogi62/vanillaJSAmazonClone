const api = "http://localhost:3004/products";

async function getProducts() {
  const response = await fetch(api);
  const products = await response.json();
  console.log(products);
}
getProducts();
