let cart = JSON.parse(localStorage.getItem("orderProduct")) || [];

// luu vao localStorage
function setLocal() {
  localStorage.setItem("listCart", JSON.stringify(cart));
}

function renderProducts(products) {
  let html = products.reduce((result, product) => {
    return (
      result +
      `
    <div class="card">
    <div class="top-card">
      <i class="fa-brands fa-android"></i>
      <em class="stocks">In Stock</em>
    </div>
    <div class="img-container">
      <img
        class="product-img"
        src="${product.img}"
        alt=""
      />
    </div>
    <div class="bot-card">
      <div class="name-card">
        <strong class="product-name">${product.name}</strong>
        <button class="heart">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="wrapper">
        <h5>Đức Tuấn Shop</h5>
        <p>
        ${product.desc}
        </p>
      </div>
      <div class="purchase">
        <p class="product-price">${product.price.toLocaleString("it-IT", {
          style: "currency",
          currency: "USD",
        })}</p>
        <span class="btn-add">
          <div>
          <button class="add-btn" class="cart" onclick=\"order('${
            product.name
          }','${product.img}','${product.price}')\">Add</button>
          </div>
        </span>
      </div>
    </div>
  </div>
    `
    );
  }, "");
  document.getElementById("tblDanhSachSP").innerHTML = html;
}

function renderCart() {
  let html = "";
  html = cart.reduce((results, product) => {
    return (
      results +
      `
          <tr>
          <td><img src="${product.img}" height="50" with="40"></td>
          <td class="name">${product.name}</td>
          <td class="price">${new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}</td>
          <td>
              
              <button class="subtract" onclick = "subtract('${
                product.name
              }')" >-</button>
              <span>${product.quality}</span>
              <button class="add" onclick = "add('${product.name}')">+</button>
              <button class="remove" onclick="remove('${
                product.name
              }')">Hủy</button>
          </td>
          </tr>
      `
    );
  }, "");
  let sum = cart.reduce((results, product) => {
    return results + product.price * product.quality;
  }, 0);
  document.getElementById("cartItem").innerHTML = html;
  document.getElementById("footer").innerHTML = `
      <tr>
          <td class="sum col-6">Tổng tiền</td>
          <td class="price">${new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "USD",
          }).format(sum)}</td>
          <td><button class="pay" onclick = "clearstorage()">Thanh Toán</button></td>
      </tr> 
  `;
}

function subtract(name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name == name) {
      if (cart[i].quality == 0) {
        alert("");
      } else {
        cart[i].quality--;
        addlocalstorage();
        renderCart();
      }
    }
  }
}

function add(name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name == name) {
      cart[i].quality++;
    }
  }
  addlocalstorage();
  renderCart();
}

function remove(name) {
  cart = cart.filter((product) => {
    if (product.name != name) {
      return product;
    }
  });
  addlocalstorage();
  renderCart();
}

function order(name, img, price) {
  let k = true;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name == name) {
      k = false;
      cart[i].quality++;
      addlocalstorage();
      break;
    }
  }
  if (k == true) {
    const orderProduct = new cartItem(name, img, price);
    console.log(orderProduct);
    orderProduct.quality + 1;
    cart.push(orderProduct);
    addlocalstorage();
  }
}

function addlocalstorage() {
  const cartProduct = JSON.stringify(cart);
  localStorage.setItem("orderProduct", cartProduct);
}
function clearstorage() {
  localStorage.clear();
  cart = [];
  renderCart();
}
