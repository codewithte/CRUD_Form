function renderTables(){
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  readProducts().forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.cate}</td>
      <td>${product.des}</td>
      <td class="actionCell">
        <button class="btnEdit" onclick="editProduct(${product.id})">Edit</button>
        <button class="btnDelete" onclick="deleteAndRender(${product.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addProducts() {
  const name = document.getElementById("proName").value;
  const price = parseFloat(document.getElementById("proPrice").value);
  const quantity = parseInt(document.getElementById("proQty").value);
  const cate = document.getElementById("inputGroupSelect01").value;
  const des = document.getElementById("textArea").value;

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert("Please fill all fields correctly.");
    return;
  }
  createProduct(name, price, quantity, cate, des);
  renderTables();
  resetProductForm();
  appendAlert('Product Added', 'success');
}

function deleteAndRender(id) {
const confirmed = confirm("Are you sure you want to delete this product?");
  if(!confirmed) return;
  deleteProduct(id);
  renderTables();
  countProduct();
  reloadProductInOrder();
}

function deleteAndRenderCate(id){
  const confirmed = confirm("Are you you want to delete this category?");
  if(!confirmed) return;
  deleteCate(id);
  renderTablecate();
  reloadCateInProduct();
  countCategory();
}

function editProduct(id) {
  const product = readProducts().find(p => p.id === id);
  if (!product) return;
  showProductForm();
  alertTrigger.classList.remove('btn');
  btnUpdate.classList.add('btn');
  document.getElementById("editProductId").value = product.id;
  document.getElementById("proName").value = product.name;
  document.getElementById("proPrice").value = product.price;
  document.getElementById("proQty").value = product.quantity;
  document.getElementById("inputGroupSelect01").value=product.cate;
  document.getElementById("textArea").value = product.des;
  renderTables();
  reloadProductInOrder();
}
let tempoCateName;

function editCate(id) {
  const category = readCate().find(p => p.id === id);
  if (!category) return;
  showCategoryForm();
  updateCateBtn.classList.add('btn');
  submitCate.classList.remove('btn');
  document.getElementById("editCateId").value = category.id;
  document.getElementById("cateName").value = category.cateName;
  tempoCateName = category.cateName;
  renderTables();

}

function resetProductForm(){
  document.getElementById("proName").value = "";
  document.getElementById("proPrice").value = "";
  document.getElementById("proQty").value = "";
  document.getElementById("inputGroupSelect01").selectedIndex = 0;
  document.getElementById("textArea").value = "";
}

function resetCateForm(){
  document.getElementById("cateName").value = "";
}

// Initial render with sample products
// renderTables();




