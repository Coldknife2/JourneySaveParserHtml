
document.querySelector("link[rel*='icon']").href = `./images/symbols/${Math.floor(Math.random()*20)}.svg`;

document.getElementById("dropSymbol").addEventListener("click", function() { toggleNavbar(); });
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

function determineTimePercentage() {
	return 1 - trig(new Date().getHours());
}

function trig(x) {
	return -0.00694444*x**2+0.1666666*x;
}

const randomPick = Math.random() > determineTimePercentage();
const saveLight = localStorage.getItem("saveLight") === null;
const saves = localStorage.getItem("saveuint8") === null && localStorage.getItem("saveuint32") === null;

let background;
if (saveLight && saves) {
	background = `url(./images/cmatw_${randomPick ? "sunny" : "dark"}.png)`;
} else if (!saveLight) {
	background = "url(./images/cmatw_sunny.png)";
} else {
	background = "url(./images/cmatw_dark.png)";
}
document.body.style.backgroundImage = background;

if (background === "url(./images/cmatw_sunny.png)") {
	const link = document.createElement("link");
	link.href = "./css/sunnyStyle.css?version=1";
	link.rel = "stylesheet";
	link.type = "text/css";
	document.getElementsByTagName("head")[0].appendChild(link);
}