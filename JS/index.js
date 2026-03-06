const barIcon = document.getElementById("barIcon");
const addProduct = document.getElementById("addProduct");
const sideBar = document.getElementById("sideBar");
const menuToggle = document.getElementById("Bar");
const collapseSidebarBtn = document.getElementById("collapseSidebarBtn");
const appHeader = document.querySelector(".app-header");
const mainContent = document.querySelector("main.main-content");

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        sideBar.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', sideBar.classList.contains('open'));
    }
}

// Close mobile menu when clicking on links
function closeMobileMenuOnNavigation() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && sideBar.classList.contains('open')) {
        sideBar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Handle window resize
function handleWindowResize() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile && sideBar.classList.contains('open')) {
        sideBar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Collapse/Expand sidebar functionality (desktop only)
function toggleSidebarCollapse() {
    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
        sideBar.classList.toggle('collapsed');
        appHeader.classList.toggle('sidebar-collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        // document.body.classList.toggle('sidebar-collapsed');
    }
}

// Event listeners for menu toggle
// menuToggle.addEventListener('click', toggleMobileMenu);
collapseSidebarBtn.addEventListener('click', toggleSidebarCollapse);
window.addEventListener('resize', handleWindowResize);

// Show/hide collapse button based on screen size
function updateCollapseButtonVisibility() {
    if (window.innerWidth > 768) {
        collapseSidebarBtn.style.display = 'flex';
    } else {
        collapseSidebarBtn.style.display = 'none';
    }
}

updateCollapseButtonVisibility();
window.addEventListener('resize', updateCollapseButtonVisibility);

const link_style = document.querySelectorAll(".link_style");
const sections = document.querySelectorAll('.content1');

link_style.forEach(linkStyle => {
    linkStyle.addEventListener("click", () => {
        closeMobileMenuOnNavigation();
    });
});

link_style.forEach(linkStyle =>{
    linkStyle.addEventListener("click",()=>{
        link_style.forEach(i => i.classList.remove('active'));
        linkStyle.classList.add('active');

        // hide all sections
        sections.forEach(section => section.classList.remove('show'));

        // show the matching section
        const targetId = linkStyle.id + 'Content'; // e.g. "Dashboard" → "DashboardContent"
        document.getElementById(targetId).classList.add('show');
        
        // Show header and overview for all non-dashboard sections
        const labelTitle = document.querySelectorAll(".header-product");
        const labelOverview = document.querySelectorAll(".overview");
        const actionHead = document.querySelectorAll(".actionHead");
        const actionCell = document.querySelectorAll(".actionCell");
        
        if(targetId === "DashboardContent"){
            // Dashboard: hide header, show overview, hide action buttons
            labelTitle.forEach(i => i.classList.add('hide'));
            labelOverview.forEach(i => i.classList.add('hide'));
            actionHead.forEach(i => i.classList.add('hide'));
            actionCell.forEach(i => i.classList.add('hide'));
            // Render dashboard tables
            renderAllDashboardTables();
        } else {
            // Other sections: show header, hide overview, show action buttons
            labelTitle.forEach(i => i.classList.remove('hide'));
            labelOverview.forEach(i => i.classList.add('hide'));
            actionHead.forEach(i => i.classList.remove('hide'));
            actionCell.forEach(i => i.classList.remove('hide'));
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

//open Add Product Content
const btnUpdate = document.getElementById("upProductBtn");
addProduct.addEventListener("click", () => {
    addHideShow("addContent", true);
    showHideBtn("liveAlertBtn", true);
    showHideBtn("upProductBtn", false);
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
    const statusSelect = document.getElementById('statusSelectOrder');
    if (statusSelect) {
      sortOrder(statusSelect.value);
    }

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
    // Also render dashboard order table
    renderDashboardOrderTable();
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
    const statusSelect = document.getElementById('statusSelectUser');
    if(statusSelect) {
        sortUser(statusSelect.value);
    }
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
    // Also render dashboard user table
    renderDashboardUserTable();
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
    } else if (!userEmail.includes("@")) {
        alert("Please enter a valid email address with '@'.");
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

const useerInfo = document.getElementById("user-wrapper");
useerInfo.addEventListener("click", () =>{
    const profile = document.getElementById("profileUser");
    if(profile.classList.contains("hide")){
        profile.classList.remove("hide");
    } else {
        profile.classList.add("hide");
    }
});

// Notification Bell Functionality
const notificationBell = document.getElementById("notificationBell");
const notificationDropdown = document.getElementById("notificationDropdown");
const closeNotification = document.getElementById("closeNotification");

// Toggle notification dropdown
notificationBell.addEventListener("click", () => {
    notificationDropdown.classList.toggle("hide");
});

// Close notification when X button is clicked
closeNotification.addEventListener("click", () => {
    notificationDropdown.classList.add("hide");
});

// Close notification when clicking outside
document.addEventListener("click", (event) => {
    const isClickInside = notificationBell.contains(event.target) || 
                         notificationDropdown.contains(event.target);
    if (!isClickInside && !notificationDropdown.classList.contains("hide")) {
        notificationDropdown.classList.add("hide");
    }
});

// Mark notifications as read when clicked
document.querySelectorAll(".notification-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.remove("unread");
    });
});





















