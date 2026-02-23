// Initial render with sample category
renderTablecate();

function renderTablecate(){
  const tbody = document.querySelector("#cateTable tbody");
  tbody.innerHTML = "";

  readCate().forEach((category, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category.cateName}</td>
      <td class="actionCell">
        <button class="btnEdit" onclick="editCate(${category.id})">Edit</button>
        <button class="btnDelete" onclick="deleteAndRenderCate(${category.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addCategory(cateName){
  createCate(cateName);
  resetCateForm();
}

function reloadCateInProduct(){
 const select = document.getElementById("inputGroupSelect01");
 select.options.length =1;
 select.options[0].selected = true;

 readCate().forEach(category =>{
  const option = document.createElement("option");
  option.value = category.cateName;
  option.textContent = category.cateName;
  select.appendChild(option);
 })
}




