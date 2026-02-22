function renderTables(){
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  readProducts().forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.cate}</td>
      <td>${product.des}</td>
      <td>
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="deleteAndRender(${product.id})">Delete</button>
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

  document.getElementById("proName").value = "";
  document.getElementById("proPrice").value = "";
  document.getElementById("proQty").value = "";
  document.getElementById("inputGroupSelect01").selectedIndex = 0;
  document.getElementById("textArea").value = "";
  
}

function deleteAndRender(id) {
  deleteProduct(id);
  renderTables();
}

function editProduct(id) {
  const product = readProducts().find(p => p.id === id);
  if (!product) return;

  const newName = prompt("Enter new name:", product.name);
  const newPrice = prompt("Enter new price:", product.price);
  const newQuantity = prompt("Enter new quantity:", product.quantity);
  const newCate = prompt("Enter new quantity:", product.cate);
  const newDes = prompt("Enter new quantity:", product.des);

  updateProduct(id, {
    name: newName || product.name,
    price: newPrice ? parseFloat(newPrice) : product.price,
    quantity: newQuantity ? parseInt(newQuantity) : product.quantity
  });

  renderTables();
}

// Initial render with sample products
renderTables();



