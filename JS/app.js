// Sort helper for products based on select value
function sortProducts(order) {
  if (order === 'az') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === 'za') {
    products.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // default ordering by id keeps insertion order
    products.sort((a, b) => a.id - b.id);
  }
}
function sortCate(order) {
  if (order === 'az') {
    category.sort((a, b) => a.cateName.localeCompare(b.cateName));
  } else if (order === 'za') {
    category.sort((a, b) => b.cateName.localeCompare(a.cateName));
  } else {
    category.sort((a, b) => a.id - b.id);
  }
}
function sortOrder(orders) {
  if (orders === 'az') {
    order.sort((a, b) => a.name.localeCompare(b.name));
  } else if (orders === 'za') {
    order.sort((a, b) => b.name.localeCompare(a.name));
  } else if (orders === 'oldest') {
    order.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (orders === 'newest') {
    order.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    order.sort((a, b) => a.id - b.id);
  }
}
function sortUser(order) {
  if (order === 'az') {
    user.sort((a, b) => a.name.localeCompare(b.cateName));
  } else if (order === 'za') {
    user.sort((a, b) => b.name.localeCompare(a.cateName));
  } else {
    user.sort((a, b) => a.id - b.id);
  }
}


function renderTables(){
  // apply sorting before rendering
  const statusSelect = document.getElementById('statusSelect');
  if (statusSelect) {
    sortProducts(statusSelect.value);
  }

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
  // Also render dashboard product table
  renderDashboardProductTable();
}

function addProducts() {
  const name = document.getElementById("proName").value;
  const price = parseFloat(document.getElementById("proPrice").value);
  const quantity = parseInt(document.getElementById("proQty").value);
  const cate = document.getElementById("inputGroupSelect01").value;
  const productCate = document.getElementById("inputGroupSelect01");
  const des = document.getElementById("textArea").value;

  if (!name || isNaN(price) || isNaN(quantity) || cate === productCate.options[0].value) {
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
  displayNumber("numberCategory", category);
}

function editProduct(id) {
  const product = readProducts().find(p => p.id === id);
  if (!product) return;
  addHideShow("addContent", true); 
  showHideBtn("liveAlertBtn", false);
  showHideBtn("upProductBtn", true);
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
  addHideShow("addContent1", true);
  showHideBtn("upCateBtn", true);
  showHideBtn("liveAlertCateBtn", false);
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

/* ---- DASHBOARD TABLE RENDER FUNCTIONS ---- */
function renderDashboardProductTable(){
  const tbody = document.querySelector("#dashboardProductTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";

  readProducts().forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.cate}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderDashboardCateTable(){
  const tbody = document.querySelector("#dashboardCateTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";

  readCate().forEach((category, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category.cateName}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderDashboardOrderTable(){
  const tbody = document.querySelector("#dashboardOrderTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";

  readOrder().forEach((order, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.name}</td>
      <td>${order.qty}</td>
      <td>${order.date}</td>
      <td>${order.cate}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderDashboardUserTable(){
  const tbody = document.querySelector("#dashboardUserTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";

  readUser().forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderAllDashboardTables(){
  renderDashboardProductTable();
  renderDashboardCateTable();
  renderDashboardOrderTable();
  renderDashboardUserTable();
}

// listen for status dropdown changes and re-render products accordingly
// this keeps sorting in sync whenever user picks A-Z, Z-A or All
document.addEventListener('DOMContentLoaded', () => {
  const statusSelect = document.getElementById('statusSelect');
  if (statusSelect) {
    statusSelect.addEventListener('change', () => {
      renderTables();
    });
  }
  const statusSelectCate = document.getElementById('statusSelectCate');
  if (statusSelectCate) {
    statusSelectCate.addEventListener('change', () => {
      renderTablecate();
    });
  }
  const statusSelectOrder = document.getElementById('statusSelectOrder');
  if (statusSelectOrder) {
    statusSelectOrder.addEventListener('change', () => {
      renderTableOrder();
    });
  }
  const statusSelectUser = document.getElementById('statusSelectUser');
  if (statusSelectUser) {
    statusSelectUser.addEventListener('change', () => {
      renderTableUser();
    });
  }

  // Initialize search functionality for all search inputs
  initializeSearch();
});

/* ---- SEARCH FUNCTIONALITY ---- */

// Generic search function for filtering table rows
function searchTable(tableId, searchText) {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  
  const rows = tbody.querySelectorAll('tr');
  const searchLower = searchText.toLowerCase();
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let isMatch = false;
    
    cells.forEach(cell => {
      if (cell.textContent.toLowerCase().includes(searchLower)) {
        isMatch = true;
      }
    });
    
    // Show or hide the row based on match
    row.style.display = isMatch ? '' : 'none';
  });
}

// Initialize search functionality for all sections
function initializeSearch() {
  // Product Search
  const productSearchInputs = document.querySelectorAll('#ProductContent .search-wrappers input');
  if (productSearchInputs.length > 0) {
    productSearchInputs[0].addEventListener('input', (e) => {
      searchTable('productTable', e.target.value);
    });
  }
  
  // Category Search
  const categorySearchInputs = document.querySelectorAll('#CategoriesContent .search-wrappers input');
  if (categorySearchInputs.length > 0) {
    categorySearchInputs[0].addEventListener('input', (e) => {
      searchTable('cateTable', e.target.value);
    });
  }
  
  // Order Search
  const orderSearchInputs = document.querySelectorAll('#OrdersContent .search-wrappers input');
  if (orderSearchInputs.length > 0) {
    orderSearchInputs[0].addEventListener('input', (e) => {
      searchTable('orTable', e.target.value);
    });
  }
  
  // User Search
  const userSearchInputs = document.querySelectorAll('#UsersContent .search-wrappers input');
  if (userSearchInputs.length > 0) {
    userSearchInputs[0].addEventListener('input', (e) => {
      searchTable('userTable', e.target.value);
    });
  }
}



