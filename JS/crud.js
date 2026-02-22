// Start with some sample products
let products = [
  { id: 1, name: "Coca-Cola", price: 2000, quantity: 90, cate: "Soft Drink", des: "Coca" },
  { id: 2, name: "Fanta", price: 2000, quantity: 80, cate: "Soft Drink", des: "Fanta" },
  { id: 3, name: "Dazz", price: 3000, quantity: 90, cate: "Energy Drink", des: "Dazz" }
];

let nextId = 4; // next ID after the sample products

function createProduct(name, price, quantity, cate, des) {
  const newProduct = { id: nextId++, name, price, quantity, cate, des};
  products.push(newProduct);
  return newProduct;
}

function readProducts() {
  return products;
}

function updateProduct(id, updatedFields) {
  const product = products.find(p => p.id === id);
  if (product) Object.assign(product, updatedFields);
  return product;
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
}
