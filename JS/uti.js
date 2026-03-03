function addHideShow(elementID, show) {
    const element = document.getElementById(elementID);
    if (show) {
        element.classList.remove("hide");
    } else {
        element.classList.add("hide");
    }
}
function showHideBtn(btnID, show) {
    const btn = document.getElementById(btnID);
    if (show) {
        btn.classList.remove("hide");
    } else {
        btn.classList.add("hide");
    }
}
function displayNumber(elementID, item) {
    const element = document.getElementById(elementID);
    element.textContent = item.length;
}
