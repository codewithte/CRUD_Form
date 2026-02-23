const barIcon = document.getElementById("barIcon");
const addProduct = document.getElementById("addProduct");
let checkBar = 1;
function showFullSideBar(){
    let sideBar = document.getElementById("sideBar");
    let companyName = document.getElementById("companyName");
    const barList = document.querySelectorAll("li");
    const listName = document.querySelectorAll("span.listName");
    const header = document.querySelector("header");
    const content1 = document.querySelectorAll(".content1");
    const adv = document.querySelector(".adv");
    if(checkBar == 1){
        sideBar.style.width = "100px";
        companyName.style.display = "none";
        barList.forEach(li =>{
            li.style.padding = "0";
        })
        listName.forEach(span =>{
            span.style.display = "none";
        })
        header.style.left = "100px";
        // content1.style.margin = "70px 0 0 100px";
        content1.forEach(content => {
            content.style.margin = "70px 0 0 100px";
        });
        adv.classList.remove('hide');
        checkBar = 0;
    } else{
        sideBar.style.width = "345px";
        companyName.style.display = "inline-block";
        barList.forEach(li =>{
            li.style.padding = "0 0 0 1rem";
        })
        listName.forEach(span =>{
            span.style.display = "inline-block";
        })
        header.style.left = "345px";
        content1.forEach(content => {
            content.style.margin = "70px 0 0 345px";
            
        });
        adv.classList.add('hide');
        checkBar = 1;
    }
}

const link_style = document.querySelectorAll(".link_style");
const sections = document.querySelectorAll('.content1');

link_style.forEach(linkStyle =>{
    linkStyle.addEventListener("click",()=>{
        link_style.forEach(i => i.classList.remove('active'));
        linkStyle.classList.add('active');

        // hide all sections
        sections.forEach(section => section.classList.remove('show'));

        // show the matching section
        const targetId = linkStyle.id + 'Content'; // e.g. "Dashboard" → "DashboardContent"
        document.getElementById(targetId).classList.add('show');
        const labelTitle = document.querySelectorAll(".header-product");
        const labelOverview = document.querySelectorAll(".overview");

        const actionHead = document.querySelectorAll(".actionHead");
        const actionCell = document.querySelectorAll(".actionCell");
        if(targetId === "DashboardContent"){
            sections.forEach(section => section.classList.add('show'));
            sections.forEach(i=> i.style.padding ="0rem 1.5rem");
            document.getElementById(targetId).style.padding = "2rem 1.5rem";

            labelTitle.forEach(i=> i.classList.remove('d-flex'));
            labelOverview.forEach(i=> i.classList.remove('hide'));

            document.getElementById("SettingContent").classList.remove('show');

            const addContent = document.querySelectorAll(".add-content");
            addContent.forEach(i=>i.classList.add('hide'));
            actionHead.forEach(i=>i.classList.add('hide'));
            actionCell.forEach(i=>i.classList.add('hide'));

        } else{
            
            labelOverview.forEach(i=> i.classList.add('hide'));
            labelTitle.forEach(i=> i.classList.add('d-flex'));
    
            sections.forEach(i=> i.style.padding ="2rem 1.5rem");

            actionHead.forEach(i=>i.classList.remove('hide'));
            actionCell.forEach(i=>i.classList.remove('hide'));
        }

    })

});

// Function Add product and alert message
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 2000);
}

const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    addProducts();
    displayNumber("numberProduct", products);
    reloadProductInOrder();
  })
}

// Event Click
barIcon.addEventListener("click",showFullSideBar);

//open Add Product Content
const btnUpdate = document.getElementById("upProductBtn");
addProduct.addEventListener("click", () => {
    addHideShow("addContent", true);
    alertTrigger.classList.add('btn');
    btnUpdate.classList.remove('btn');
    resetProductForm();

});
//Close Add Product Content
document.getElementById("closeIconProduct").addEventListener("click", () =>{
    addHideShow("addContent", false);
});

btnUpdate.addEventListener("click", () =>{
    const id = parseInt(document.getElementById("editProductId").value);
    const testname = document.getElementById("proName").value;
    const testprice = parseFloat(document.getElementById("proPrice").value);
    const testquantity = parseInt(document.getElementById("proQty").value);

  if (!testname || isNaN(testprice) || isNaN(testquantity)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const updatedFields = {
    name: document.getElementById("proName").value,
    price: parseFloat(document.getElementById("proPrice").value),
    quantity: parseInt(document.getElementById("proQty").value),
    cate: document.getElementById("inputGroupSelect01").value,
    des: document.getElementById("textArea").value
  };

  updateProduct(id, updatedFields);
  renderTables();
  addHideShow("addContent", false);
  reloadProductInOrder();
});


// Form Cate
 const addCateBtn = document.getElementById("addCate");
 const closeIconCate = document.getElementById("closeIconCate");
 const submitCate = document.getElementById("liveAlertCateBtn");
const updateCateBtn = document.getElementById("upCateBtn");

 addCateBtn.addEventListener("click", () =>{
    resetCateForm();
    addHideShow("addContent1", true);
    showHideBtn("liveAlertCateBtn", true);
    showHideBtn("upCateBtn", false);
 });
 closeIconCate.addEventListener("click", () =>{
    addHideShow("addContent1", false);
});
 submitCate.addEventListener("click", () =>{
    const toPlaceLabel = document.getElementById("toPlaceLabel");
    const label =  document.createElement("p");
    const cateName = document.getElementById("cateName").value;
    if(!cateName){
        alert("Please fill form correctly!");
        return;
    }
    const found = category.find(cate => cate.cateName === cateName);
        if(found){
            alert("Category Name already exists!")
        return;
    }
    label.textContent = "Category Added!";
    toPlaceLabel.appendChild(label);

    setTimeout(() =>{
        label.remove();
    }, 1000);

    addCategory(cateName);
    renderTablecate();
    reloadCateInProduct();
    displayNumber("numberCategory", category);
 })

 updateCateBtn.addEventListener("click", () =>{
    const id = parseInt(document.getElementById("editCateId").value);
    const testCateName = document.getElementById("cateName").value;
    if(!testCateName) {
        alert("Please fill the name!"); 
        return;
    }
    const founds = category.find(cate => cate.cateName === testCateName);
    if(founds){
        if(founds.cateName !== tempoCateName){
            alert("Category Already Exists")
            return;
        }
    }
    const updateField ={
        cateName: testCateName
    };
    updateCate(id, updateField);
    renderTablecate();
    addHideShow("addContent1", false);
    reloadCateInProduct();
 })

// Press key Enter To Submit Product Form
const formProduct = document.getElementById("formProduct");
formProduct.addEventListener("keydown", function(event){
    if(event.key === "Enter") {
        if(alertTrigger.classList.contains("btn")){
            event.preventDefault();
            addProducts();
            displayNumber("numberProduct", products);
            reloadProductInOrder();
        } else if(btnUpdate.classList.contains("btn")){
            event.preventDefault();
            const id = parseInt(document.getElementById("editProductId").value);
            const testname = document.getElementById("proName").value;
            const testprice = parseFloat(document.getElementById("proPrice").value);
            const testquantity = parseInt(document.getElementById("proQty").value);

            if (!testname || isNaN(testprice) || isNaN(testquantity)) {
                alert("Please fill all fields correctly.");
                return;
            }

            const updatedFields = {
                name: document.getElementById("proName").value,
                price: parseFloat(document.getElementById("proPrice").value),
                quantity: parseInt(document.getElementById("proQty").value),
                cate: document.getElementById("inputGroupSelect01").value,
                des: document.getElementById("textArea").value
            };

            updateProduct(id, updatedFields);
            renderTables();
            addHideShow("addContent", false);
        }
    } else if(event.key === "Escape"){
        addHideShow("addContent", false);
    }
})


// Order
// Declare
const btnAddOrder = document.getElementById("addOrder");
const closeIconOrder = document.getElementById("closeIconOrder");
const addOrderSubmitBtn = document.getElementById("btnSubmitOrder");
const updateOrderBtn = document.getElementById("btnUpdateOrder");
// Function
function renderTableOrder(){
    const tbody = document.querySelector("#orTable tbody");
    tbody.innerHTML = "";

    readOrder().forEach((order, index) => {
        const row = document.createElement("tr");
        row.innerHTML= `
        <td>${index + 1}</td>
        <td>${order.name}</td>
        <td>${order.qty}</td>
        <td>${order.date}</td>
        <td>${order.cate}</td>
        <td class="actionCell">
            <button class="btnEdit" onclick="editOr(${order.id})">Edit</button>
            <button class="btnDelete" onclick="deleteAndRenderOr(${order.id})">Delete</button>
        </td>
        `;
        tbody.appendChild(row);
    })
}
function reloadProductInOrder(){
    const select = document.getElementById("inputGroupSelect02");
    select.options.length =1;
    select.options[0].selected = true;
    readProducts().forEach(products=>{
        const option = document.createElement("option");
        option.value = products.name;
        option.textContent = products.name;
        select.appendChild(option);
    })
}

function countOrder(){
    const numberOrder = document.getElementById("numberOrder");
    numberOrder.textContent = order.length;
}

function resetOrderForm(){
    document.getElementById("orName").value = "";
    document.getElementById("orQty").value = "";
    document.getElementById("orDate").value = "";
    document.getElementById("inputGroupSelect02").selectedIndex= 0;
}
function deleteOrder(id){
    order = order.filter(p=> p.id !==id);
}

function editOr(id){
    const order = readOrder().find(p=> p.id === id);
    if (!order) return;
    addHideShow("addContent2", true);
    showHideBtn("btnUpdateOrder", true);
    showHideBtn("btnSubmitOrder", false);
    document.getElementById("editOrderId").value = order.id;
    document.getElementById("orName").value = order.name;
    document.getElementById("orQty").value = order.qty;
    document.getElementById("orDate").value = order.date;
    document.getElementById("inputGroupSelect02").value = order.cate;
    renderTableOrder();
}
function deleteAndRenderOr(id){
    const confirmed = confirm("Are you sure you want to delete this Order");
    if(!confirmed) return;
    deleteOrder(id);
    renderTableOrder();
    countOrder();
}
function updateOr(id, updateField){
    const or = order.find(p=> p.id === id);
    if(or) Object.assign(or, updateField);
    return or;
}
// Event

// Click Add Order And Then Open Order Content
btnAddOrder.addEventListener("click", () =>{
    addHideShow("addContent2", true);
    showHideBtn("btnUpdateOrder", false);
    showHideBtn("btnSubmitOrder", true);
    resetOrderForm();
})

// Click X Icon then close Order Content
closeIconOrder.addEventListener("click",()=>addHideShow("addContent2",false));

// Click Add Order then put order into array and table
addOrderSubmitBtn.addEventListener("click", () =>{
    const orderName = document.getElementById("orName").value;
    const orderQTY = document.getElementById("orQty").value;
    const orderDate = document.getElementById("orDate").value;
    const orderProduct = document.getElementById("inputGroupSelect02");
    const orderProductValue = document.getElementById("inputGroupSelect02").value;
    const toPlaceLabel = document.getElementById("toPlaceLabel2");
    const label =  document.createElement("p");
    if(!orderName || isNaN(orderQTY) || !orderDate || orderProduct.value === orderProduct.options[0].value){
        alert("Please Fill the form!");
        return;
    }
    label.textContent = "Orders Added!";
    toPlaceLabel.appendChild(label);
    setTimeout(()=>{
        label.remove();
    }, 1000);

    createOrder(orderName, orderQTY, orderDate, orderProductValue);
    renderTableOrder();
    countOrder();
    resetOrderForm();
    
})

// Click Update Order then update it
updateOrderBtn.addEventListener("click", ()=>{
    const id = parseInt(document.getElementById("editOrderId").value);
    const testOrderName = document.getElementById("orName").value;
    const testOrderQty = document.getElementById("orQty").value;
    const testOrderDate = document.getElementById("orDate").value;
    const testOrderSelect = document.getElementById("inputGroupSelect02").value;
    if(!testOrderName || isNaN(testOrderQty) || !testOrderDate){
        alert("Please fill the form first!");
        return;
    }
    const updateField ={
        name: testOrderName,
        qty: testOrderQty,
        date: testOrderDate,
        cate: testOrderSelect
    };
    updateOr(id, updateField);
    renderTableOrder();
    addHideShow("addContent2", false);
})



// User
// Declare
const btnAddUser = document.getElementById("addUser");
const closeIconUser = document.getElementById("closeIconUser");
const addUserSubmitBtn = document.getElementById("btnSubmitUser");
const updateUserBtn = document.getElementById("btnUpdateUser");

// Function
function renderTableUser(){
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    readUser().forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML= `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td class="actionCell">
            <button class="btnEdit" onclick="editUser(${user.id})">Edit</button>
            <button class="btnDelete" onclick="deleteAndRenderUser(${user.id})">Delete</button>
        </td>
        `;
        tbody.appendChild(row);
    })
}
function countUser(){
    const numberuser = document.getElementById("numberUser");
    numberuser.textContent = user.length;
}

function resetUserForm(){
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPhone").value = "";
}
function deleteUser(id){
    user = user.filter(p=> p.id !==id);
}

function editUser(id){
    const user = readUser().find(p=> p.id === id);
    if (!user) return;
    addHideShow("addContent3", true);
    showHideBtn("btnUpdateUser", true);
    showHideBtn("btnSubmitUser", false);
    document.getElementById("editUserId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userPhone").value = user.phone;
    renderTableUser();
}
function deleteAndRenderUser(id){
    const confirmed = confirm("Are you sure you want to delete this User");
    if(!confirmed) return;
    deleteUser(id);
    renderTableUser();
    countUser();
}
function updateUser(id, updateField){
    const users = user.find(p=> p.id === id);
    if(users) Object.assign(users, updateField);
    return users;
}
// Event
// Click Add User And Then Open User Content
btnAddUser.addEventListener("click", () =>{
    addHideShow("addContent3", true);
    showHideBtn("btnUpdateUser", false);
    showHideBtn("btnSubmitUser", true);
    resetUserForm();
})

// Click X Icon then close User Content
closeIconUser.addEventListener("click",()=>addHideShow("addContent3",false));

// Click Add User then put user into array and table
addUserSubmitBtn.addEventListener("click", () =>{
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPhone = document.getElementById("userPhone").value;
    const toPlaceLabel = document.getElementById("toPlaceLabel3");
    const label =  document.createElement("p");
    if(!userName || !userEmail || !userPhone){
        alert("Please Fill the form!");
        return;
    }
    label.textContent = "User Added!";
    toPlaceLabel.appendChild(label);
    setTimeout(()=>{
        label.remove();
    }, 1000);

    createUser(userName, userEmail, userPhone);
    renderTableUser();
    countUser();
    resetUserForm();
})

// Click Update User then update it
updateUserBtn.addEventListener("click", ()=>{
    const id = parseInt(document.getElementById("editUserId").value);
    const testUserName = document.getElementById("userName").value;
    const testUserEmail = document.getElementById("userEmail").value;
    const testUserPhone = document.getElementById("userPhone").value;
    if(!testUserName || !testUserEmail || !testUserPhone){
        alert("Please fill the form first!");
        return;
    }
    const updateField ={
        name: testUserName,
        email: testUserEmail,
        phone: testUserPhone,
    };
    updateUser(id, updateField);
    renderTableUser();
    addHideShow("addContent3", false);
})

























