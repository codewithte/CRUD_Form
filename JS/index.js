const barIcon = document.getElementById("barIcon");

function showFullSideBar(){
    let sideBar = document.getElementById("sideBar");
    sideBar.style.width = "100px";

    let companyName = document.getElementById("companyName");
    companyName.style.display = "none";

    const barList = document.querySelectorAll("li");
    barList.forEach(li =>{
        li.style.padding = "0";
    })

    const listName = document.querySelectorAll("span.listName");
    listName.forEach(span =>{
        span.style.display = "none";
    })

    const header = document.querySelector("header");
    header.style.left = "100px";


}

barIcon.addEventListener("click",showFullSideBar);