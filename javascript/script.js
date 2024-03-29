const api = "http://localhost:3004/cartItems";
let prices;
async function getProducts() {
  const response = await fetch(api);
  const products = await response.json();
  generateCartItems(products);
  sumAllProducts(products);
}

function generateCartItems(cartItems) {
  let itemsHTML = "";
  cartItems.forEach((item) => {
    itemsHTML += `
          <div class="cart-item flex items-center pb-4 border-b border-gray-100">
          <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
            <img class="w-full h-full object-contain" src="${item.productImage}">
          </div>
          <div class="cart-item-details flex-grow">
                    <div class="cart-item-title font-bold text-sm text-gray-600">
                    ${item.productName}
                    </div>
                    <div class="cart-item-brand text-sm text-gray-400">
                    ${item.brandName}
                    </div>
              </div>
            <div class="cart-item-counter w-48 flex items-center">
              <div
                class="cart-item-decrease text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2 cursor-pointer">
                <i class="fas fa-chevron-left fa-xs"></i>
              </div>
              <h4 class="text-gray-400">1</h4>
              <div
                class="cart-item-increase text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2 cursor-pointer">
                <i class="fas fa-chevron-right fa-xs"></i>
              </div>
          </div>
          <div class="cart-item-total-cost w-48 font-bold text-gray-400">
            ${item.productPrice}
          </div>
          <div class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400" data-id='${item.id}'>
            <i class="fa-solid fa-circle-xmark"></i>
          </div>
          </div>
      `;
  });
  document.querySelector(".cart-items").innerHTML = itemsHTML;

  const deleteBtns = document.querySelectorAll(".cart-item-delete");
  deleteBtns.forEach((btn) => btn.addEventListener("click", deleteItem));
}

function sumAllProducts(products) {
  sum = products.map((product) => product.productPrice);
  prices = sum.reduce((acc, curr) => (acc += curr), 0);
  showTotalSum(prices);
}
function showTotalSum(prices) {
  const total = document.querySelector(".total-cost-number");
  total.innerHTML = prices;
}

function deleteItem(event) {
  fetch(`${api}/${event.currentTarget.dataset.id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

getProducts();
