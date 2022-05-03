
// eslint-disable-next-line no-undef
const helper = new JourneyHelper(setupCall);
helper.attachGeneralListeners();

const editZone = document.getElementById("editZone");
const overview = document.getElementById("overview");
const levelSelect = document.getElementById("levelSelect");
const robeSelect = document.getElementById("robeSelect");
const scarfSelect = document.getElementById("scarfSelect");
const symbolSelect = document.getElementById("symbolSelect");
const backButton = document.getElementById("backButton");
const downloadButton = document.getElementById("downloadButton");

const overviewButtons = {
	robe: document.getElementById("robeSelectButton"),
	symbol: document.getElementById("symbolSelectButton"),
	scarf: document.getElementById("scarfSelectButton"),
	level: document.getElementById("levelSelectButton")
};

const offsets = {
	robe: 0x08,
	symbol: 0x0C,
	scarf: 0x10,
	level: 0x18,
	symbolNumber: 0x20
};

const robe = {
	arrowL: document.getElementById("robeL"),
	arrowR: document.getElementById("robeR"),
	colorToggle: document.getElementById("toggleRobeColor"),
	robe: document.getElementById("robeImage"),
	currentColor: "red"
};

const symbol = {
	arrowL: document.getElementById("symbolL"),
	arrowR: document.getElementById("symbolR"),
	symbol: document.getElementById("symbol"),
	value: document.getElementById("symbolValue")
};

const scarf = {
	slider: document.getElementById("scarfSlider"),
	value: document.getElementById("scarfValue"),
	recommendation: document.getElementById("recommendation"),
	redScarfRecommendations1: [7, 12, 18, 22, 28, 30], // +1 row; values by nathanj
	redScarfRecommendations2: [7, 11, 17, 22, 28, 30] // +2 row; +6 for white scarf
};

const level = {
	arrowL: document.getElementById("levelL"),
	arrowR: document.getElementById("levelR"),
	level: document.getElementById("level"),
	value: document.getElementById("levelValue"),
	currentValue: 0,
	name: ["Chapter Select", "Broken Bridge", "Pink Desert", "Sunken City", "Underground", "Tower", "Snow", "Paradise", "Credits", "Level Bryan", "Level Matt", "Level Chris"]
};

function attachListeners() {
	overviewButtons.robe.addEventListener("click", () => robeChanger("init"));
	overviewButtons.symbol.addEventListener("click", () => symbolChanger("init"));
	overviewButtons.scarf.addEventListener("click", () => scarfChanger("init"));
	overviewButtons.level.addEventListener("click", () => levelChanger("init"));

	level.arrowL.addEventListener("click", () => levelChanger("decrement"));
	level.arrowR.addEventListener("click", () => levelChanger("increment"));

	robe.arrowL.addEventListener("click", () => robeChanger("decrement"));
	robe.arrowR.addEventListener("click", () => robeChanger("increment"));
	robe.colorToggle.addEventListener("click", () => robeChanger("changeColor"));

	symbol.arrowL.addEventListener("click", () => symbolChanger("decrement"));
	symbol.arrowR.addEventListener("click", () => symbolChanger("increment"));

	backButton.addEventListener("click", () => back());
	downloadButton.addEventListener("click", () => download());
}

// https://stackoverflow.com/a/11410079
function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function setupCall() {
	helper.changeVisibility([helper.dropZoneVisibilityToggler, overview, editZone]);
	checkLevel();
	attachListeners();
}

function setScarfLengthRecommendationText() {
	const robeData = helper.readData("uint8", offsets.robe);
	const color = robeData > 3 ? "white" : "red";
	robe.currentColor = color;

	const levelData = helper.readData("uint8", offsets.level);
	level.currentValue = levelData;

	const valueToAdd = helper.readData("uint8", offsets.symbolNumber) % 2;
	const recommendationsToUse = valueToAdd === 1 ? scarf.redScarfRecommendations2 : scarf.redScarfRecommendations1;
	const levelToUse = level.currentValue - 1 >= recommendationsToUse.length ? recommendationsToUse.length - 1 : level.currentValue - 1;
	const suggestedScarfLength = recommendationsToUse[levelToUse] + (robe.currentColor === "red" ? 0 : 6);
	const roundedSuggestedLength = clamp(suggestedScarfLength, 0, 30);
	scarf.recommendation.innerText = `Recommended scarf length for ${robe.currentColor} robe in ${level.name[level.currentValue]} is ${roundedSuggestedLength}`;
}

function robeChanger(task) {
	let robeData = helper.readData("uint8", offsets.robe);
	let newTier, newColor;
	switch (task) {
		case "init":
			changeArrow("robe");
			helper.changeVisibility([backButton, overview, robeSelect]);
			break;
		case "increment":
			newTier = robeData > 3 ? clamp(clamp(robeData + 1, 4, 7) % 7, 4, 6) : clamp(robeData + 1, 0, 4) % 4;
			helper.writeData("uint8", offsets.robe, newTier);
			break;
		case "decrement":
			newTier = robeData > 3 ? robeData - 1 < 4 ? 6 : clamp(robeData - 1, 4, 6) : robeData - 1 < 0 ? 3 : clamp(robeData - 1, 0, 3);
			helper.writeData("uint8", offsets.robe, newTier);
			break;
		case "changeColor":
			newColor = robeData ? robeData > 3 ? robeData - 3 : robeData + 3 : 4;
			helper.writeData("uint8", offsets.robe, newColor);
			break;
	}
	robeData = helper.readData("uint8", offsets.robe);
	let color = robeData > 3 ? "white" : "red";
	let tier = robeData > 3 ? robeData - 2 : robeData + 1;
	robe.robe.src = `./images/robes/${color}${tier}.png`;
}

function scarfChanger(task) {
	let scarfData = helper.readData("uint8", offsets.scarf);
	switch (task) {
		case "init":
			helper.changeVisibility([backButton, overview, scarfSelect]);
			scarf.value.innerText = scarfData;
			scarf.slider.value = scarfData;
			setScarfLengthRecommendationText();
			break;
		case "valueChange":
			scarf.value.innerText = scarf.slider.value;
			helper.writeData("uint8", offsets.scarf, scarf.slider.value);
			break;
	}
}

scarf.slider.oninput = () => scarfChanger("valueChange");

function symbolChanger(task) {
	let symbolData = helper.readData("uint8", offsets.symbol);
	switch (task) {
		case "init":
			changeArrow("symbol");
			helper.changeVisibility([backButton, overview, symbolSelect]);
			break;
		case "increment":
			symbolData += 1;
			symbolData %= 21; // positive wrap-around
			helper.writeData("uint8", offsets.symbol, symbolData);
			break;
		case "decrement":
			symbolData = symbolData - 1 < 0 ? 20 : symbolData - 1; // negative wrap-around
			helper.writeData("uint8", offsets.symbol, symbolData);
			break;
	}
	symbolData = helper.readData("uint8", offsets.symbol);
	const hexUnicodeGlyphRepresentation = (symbolData + 1).toString(16).padStart(2, "0");
	symbol.symbol.innerText = String.fromCharCode("0xE0" + hexUnicodeGlyphRepresentation);
	symbol.value.innerText = `Symbol ${symbolData}`;
}

function levelChanger(task) {
	let levelData = helper.readData("uint8", offsets.level);
	switch (task) {
		case "init":
			changeArrow("level");
			helper.changeVisibility([backButton, overview, levelSelect]);
			break;
		case "increment":
			levelData += 1;
			levelData = levelData % 12 === 0 ? 1 : levelData;
			helper.writeData("uint8", offsets.level, levelData);
			break;
		case "decrement":
			levelData = levelData - 1 < 1 ? 11 : levelData - 1;
			helper.writeData("uint8", offsets.level, levelData);
			break;
	}
	levelData = helper.readData("uint8", offsets.level);

	level.level.src = `./images/levels/${levelData}.png`;
	level.value.innerText = `${levelData} - ${level.name[levelData]}`;
	level.currentValue = levelData;
}

function checkLevel() {
	let levelData = helper.readData("uint8", offsets.level);
	if (levelData === 0) {
		helper.writeData("uint8", offsets.level, 1);
	}
}

function back() {
	helper.changeVisibility([backButton, overview, helper.visible]);
}

function changeArrow(prefix) {
	const left = document.getElementById(`${prefix}L`);
	const right = document.getElementById(`${prefix}R`);
	const integer = Math.floor(Math.random() * 4 + 1);
	left.src = `./images/arrows/arrow${integer}L.svg`;
	right.src = `./images/arrows/arrow${integer}R.svg`;
}

// https://stackoverflow.com/a/30832210
function download() {
	var file = new Blob([helper.saveFile8]);
	if (window.navigator.msSaveBlob) { // IE10+
		window.navigator.msSaveBlob(file, "SAVE.BIN");
	} else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = "SAVE.BIN";
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}