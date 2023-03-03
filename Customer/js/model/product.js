function Product(
  id,
  name,
  price,
  screen,
  frontCamera,
  backCamera,
  img,
  type,
  desc
) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.screen = screen;
  this.frontCamera = frontCamera;
  this.backCamera = backCamera;
  this.img = img;
  this.type = type;
  this.desc = desc;
}

function cartItem(name, img, price) {
  this.quality = 1;
  this.name = name;
  this.img = img;
  this.price = price;
}
