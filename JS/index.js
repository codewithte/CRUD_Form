const barIcon = document.getElementById("barIcon");
let checkBar = 1;
const addProduct = document.getElementById("addProduct");

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

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Product Added', 'success');
    addProducts();
  })
}

// Event Click
barIcon.addEventListener("click",showFullSideBar);


//open Add Product Content
const openCloseProduct = document.getElementById("addContent");
addProduct.addEventListener("click", () => {
    openCloseProduct.classList.remove('hide');
});
//Close Add Product Content
const closeIconProduct = document.getElementById("closeIconProduct");
closeIconProduct.addEventListener("click", () => {
    openCloseProduct.classList.add('hide');
});










