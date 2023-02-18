const api = "http://localhost:3004/listProducts";
async function getAllProducts() {
  const response = await fetch(api);
  const products = await response.json();
  console.log(products);
}

getAllProducts();
