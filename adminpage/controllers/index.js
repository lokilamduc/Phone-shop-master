getProducts();

//Hàm gửi yêu cầu lấy danh sách sản phẩm
function getProducts(searchValue) {
  apiGetProducts(searchValue).then((response) => {
    const products = response.data.map((product) => {
      return new Product(
        product.id, 
        product.name, 
        product.price, 
        product.screen,
        product.frontCamera,
        product.backCamera,
        product.img, 
        product.type,
        product.desc,
      );
    });
    renderProducts(products);
  })
  .catch((error) => {
    //Call API thất bại
    alert("API get products error");
  });
}

//hàm thêm sản phẩm: DOm và gửi yêu cầu thêm sản phảm
function createProduct() {
  const product = {
    name: getElement("#tenSP").value,
    price: getElement("#giaSP").value,
    screen: getElement("#manHinhSP").value,
    frontCamera: getElement("#camTruocSP").value,
    backCamera: getElement("#camSauSP").value,
    img: getElement("#hinhSP").value,
    type: getElement("#loaiSP").value,
    desc: getElement("#moTaSP").value,
  };
  apiCreateProduct(product)
  .then((response) => {
    getProducts();
  })
  .catch((error) => {
    alert("Thêm sản phẩm thất bại");
  });
  } 

  //Hàm xóa sản phẩm

function deleteProduct(productId) {
  apiDeleteProduct(productId)
  .then(() => {
    getProducts();
  })
  .catch((error) => {
    alert("Xóa sản phẩm thất bại")
  });
}

//hàm cập nhập sản phẩm 
function updateProduct(productId) {
  const product = {
    name: getElement("#tenSP").value,
    price: getElement("#giaSP").value,
    screen: getElement("#manHinhSP").value,
    frontCamera: getElement("#camTruocSP").value,
    backCamera: getElement("#camSauSP").value,
    img: getElement("#hinhSP").value,
    type: getElement("#loaiSP").value,
    desc: getElement("#moTaSP").value,
  };

  apiUpdateProduct(productId, product)
  .then((response) => {getProducts();
  })
  .catch((error) => {
    alert("Cập nhật sản phẩm thất bai");
  });
}

//Hàm lấy chi tiết 1 sản phẩm và hiển thị lên modal
function selectProduct(productId) {
  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
  <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
  <button class="btn btn-primary" onclick="createProduct()">Cập nhật</button>
`;
apiGetProductById(productId)
.then((response) => {
  const product = response.data;
    getElement("#tenSP").value = product.name;
    getElement("#giaSP").value = product.price;
    getElement("#manHinhSP").value = product.screen;
    getElement("#camTruocSP").value = product.frontCamera;
    getElement("#camSauSP").value = product.backCamera;
    getElement("#hinhSP").value = product.img;
    getElement("#loaiSP").value = product.type;
    getElement("#moTaSP").value = product.desc;
    getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
    getElement(".modal-footer").innerHTML = `
      <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
      <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
    `;
    $("#myModal").modal("show");
}) 
    .catch((error) => {
      alert("Lấy chi tiết sản phẩm thất bại");
    })
}

function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (result + `
    <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.screen}</td>
        <td>${product.frontCamera}</td>
        <td>${product.backCamera}</td>
        <td>
          <img src="${product.img}" width="80px" height="80px" />
        </td>
        <td>${product.type}</td>
        <td>${product.desc}</td>
        <td>
          <button class="btn btn-primary"
          onclick="selectProduct('${product.id}')">
          Xem
          </button>
          <button class="btn btn-danger" 
          onclick="deleteProduct('${product.id}')"
          >Xoá</button>
        </td>
      </tr>
    `)
  },"")
  getElement("#tblDanhSachNguoiDung").innerHTML = html ;
}

getElement("#btnThemSP").addEventListener("click", () => {
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
  `
});

getElement("#txtSearch").addEventListener("keydown", (event) => {if (event.key !== "Enter") return;
  
const searchValue = event.target.value;
getProducts(searchValue);
});

function getElement(selector) {
  return document.querySelector(selector);
}