let navbar = document.getElementById("navbarContainer");
let dropSymbol = document.getElementById("dropSymbol");
let expanded = true;

function toggleNavbar() {
    if (expanded) {
        navbar.classList.remove("navbarOffsetRetracted");
        navbar.classList.add("navbarOffsetExpanded");
        dropSymbol.style.transform = "rotate(90deg)";
    } else {
        navbar.classList.add("navbarOffsetRetracted");
        navbar.classList.remove("navbarOffsetExpanded");
        dropSymbol.style.transform = "rotate(270deg)";
    }
    expanded = !expanded;
}

document.querySelector("link[rel*='icon']").href = `./images/symbols/${Math.floor(Math.random()*20)}.svg`;