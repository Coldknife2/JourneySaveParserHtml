import { checkLocalStorageAvailable, getStorage } from "./dataManager";
import { squarePolynomial } from "./math";

export let lightBackground = "hov";

function determineTimePercentage() {
	return 1 - squarePolynomial(new Date().getHours(), -0.00694444, 0.1666666);
}

export function setBackground() {
	const randomPick = Math.random() > determineTimePercentage();

	let saveLight = true, saves = true;
	if (checkLocalStorageAvailable()) {
		saveLight = localStorage.getItem("savelight") === null;
		saves = !(getStorage("uint8") && getStorage("uint16") && getStorage("uint32") && getStorage("uint64"));
	}

	let background;
	if (saveLight && saves) {
		background = randomPick ? "light" : "dark";
	} else if (!saveLight) {
		background = "light";
	} else {
		background = "dark";
	}
	if (background === "light") {
		lightBackground += " hovLight";
	}
	return background;
}
