import { randomRange, squarePolynomial } from "./math";
import { sym } from "@/images";

export let lightBackground = "";

function determineTimePercentage() {
	return 1 - squarePolynomial(new Date().getHours(), -0.00694444, 0.1666666);
}

export function setBackground() {
	const randomPick = Math.random() > determineTimePercentage();
	const saveLight = localStorage.getItem("savelight") === null;
	const saves = localStorage.getItem("saveuint8") === null && localStorage.getItem("saveuint32") === null;

	let background;
	if (saveLight && saves) {
		background = randomPick ? "light" : "dark";
	} else if (!saveLight) {
		background = "light";
	} else {
		background = "dark";
	}
	if (background === "light") {
		lightBackground = "hov hovLight";
	} else {
		lightBackground = "hov";
	}
	document.body.className = background;
}

(document.querySelector("link[rel*='icon']") as HTMLAnchorElement).href = sym[randomRange(0, 20)];