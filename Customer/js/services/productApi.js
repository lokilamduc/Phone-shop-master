getProducts();
function getProducts() {
  axios({
    method: "GET",
    url: "https://63f09efb5703e063fa490da7.mockapi.io/api/Products",
  }).then((response) => {
    renderProducts(response.data);
  });
}
