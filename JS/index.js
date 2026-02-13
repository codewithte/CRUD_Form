const barIcon = document.getElementById("barIcon");
let checkBar = 1;

function showFullSideBar(){
    let sideBar = document.getElementById("sideBar");
    let companyName = document.getElementById("companyName");
    const barList = document.querySelectorAll("li");
    const listName = document.querySelectorAll("span.listName");
    const header = document.querySelector("header");
    const content1 = document.querySelector(".content1");
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

        content1.style.margin = "70px 0 0 100px";

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

        content1.style.margin = "70px 0 0 345px";

        adv.classList.add('hide');


        checkBar = 1;
    }
}

barIcon.addEventListener("click",showFullSideBar);

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

        // alert    ("hi");
    })

});




const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // remove active from all nav items
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // hide all sections
    sections.forEach(section => section.classList.remove('active'));

    // show the matching section
    const targetId = item.id + 'Content'; // e.g. "product" → "productContent"
    document.getElementById(targetId).classList.add('active');
  });
});



