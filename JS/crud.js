let category = [];
let products = [];
let order = []
let user = []
let nextIdCate = 1;
let nextId = 1;
let nextIDOrder = 1;
let nextIdUser = 1;

function createProduct(name, price, quantity, cate, des) {
  const newProduct = { id: nextId++, name, price, quantity, cate, des};
  products.push(newProduct);
  return newProduct;
}

function createCate(cateName){
  const newCate = {id: nextIdCate++, cateName};
  category.push(newCate);
  return newCate;
}

function createOrder(name, qty, date, cate){
  const newOrder = {id: nextIDOrder++, name, qty, date, cate};
  order.push(newOrder);
  return newOrder;
}
function createUser(name,email,phone){
  const newUser = {id: nextIdUser++, name, email, phone};
  user.push(newUser);
  return newUser;
}

function readProducts() {
  return products;
}

function readOrder(){
  return order;
}
function readUser(){
  return user;
}

function updateProduct(id, updatedFields) {
  const product = products.find(p => p.id === id);
  if (product) Object.assign(product, updatedFields);
  return product;
}

function updateCate(id, updateField) {
  const cate = category.find(p => p.id ===id);
  if(cate) Object.assign(cate, updateField);
  return cate;
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
}

function deleteCate(id) {
  category = category.filter(p => p.id !== id);
}

function readCate(){
  return category;
}




