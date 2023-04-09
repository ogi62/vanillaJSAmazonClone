const api = "http://localhost:3004/listProducts";
const apiCartItems = "http://localhost:3004/cartItems";
async function getAllProducts() {
  const response = await fetch(api);
  const products = await response.json();
  generateItems(products);
}

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-5");
    doc.innerHTML = `
          <div class='btn-show-details' data-id='${item.id}'>
          <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
              <img class="w-full h-full object-contain" src="${item.productImage}">
          </div>
          <div class="product-name text-gray-700 font-bold mt-2 text-sm">
              ${item.productName}
          </div>
          <div class="product-make text-green-700 font-bold">
              ${item.brandName}
          </div>
          <div class="product-rating text-yellow-300 font-bold my-1">
          ⭐⭐⭐⭐⭐ ${item.productRating}
          </div>
          <div class="product-price font-bold text-gray-700 text-lg">
              ${item.productPrice}
          </div>
          </div>
      `;

    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "hover:bg-yellow-600",
      "cursor-pointer",
      "product-add",
      "h-8",
      "w-28",
      "rounded",
      "bg-yellow-500",
      "text-white",
      "text-md",
      "flex",
      "justify-center",
      "items-center",
    );
    addToCartEl.innerText = "Add to cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });

  const btnDetails = document.querySelectorAll(".btn-show-details");

  btnDetails.forEach((btnDetail) => {
    btnDetail.addEventListener("click", showDetailProduct);
  });
}

const writeServer = (action, data) => ({
  method: action,
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

function addToCart(item) {
  fetch(apiCartItems, writeServer("POST", item))
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function showDetailProduct(event) {
  const id = event.currentTarget.dataset.id;
  fetch(`${api}/${id}`)
    .then((response) => response.json())
    .then((singleItem) => {
      showSingleItem(singleItem);
    });
}

function showSingleItem(item) {
  const mainSection = document.querySelector(".main-section-products");
  mainSection.innerHTML = "";
  const singleItemDiv = document.createElement("div");
  singleItemDiv.classList.add("single-item");
  singleItemDiv.innerHTML = `
  <div class="product-image w-100 h-100 bg-white rounded-lg p-4">
  <img class="w-full h-full object-contain" src="${item.productImage}">
</div>
<div class="product-name text-gray-700 font-bold mt-2 text-sm">
  ${item.productName}
</div>
<div class="product-make text-green-700 font-bold">
  ${item.brandName}
</div>
<div class="product-rating text-yellow-300 font-bold my-1">
⭐⭐⭐⭐⭐ ${item.productRating}
</div>
<div class="product-price font-bold text-gray-700 text-lg">
  ${item.productPrice}
</div>
<div class='flex justify-around items-center'>
<button class='add-item bg-black text-white' data-id='${item.id}'>Add to Cart</button>
<button class='go-back bg-yellow-500 text-white'>Go Back</button>
</div>

  `;
  mainSection.appendChild(singleItemDiv);
  const goBack = document.querySelector(".go-back");
  goBack.addEventListener("click", function () {
    mainSection.innerHTML = "";
    getAllProducts();
  });
  const addItem = document.querySelector(".add-item");
  addItem.addEventListener("click", function () {
    addToCart(item);
  });
}
getAllProducts();
