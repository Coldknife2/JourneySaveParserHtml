
const dropZoneVisibilityToggler = document.getElementById("dropZoneVisibilityToggler"); // display: flex & hidden does not works well together
let saveFile32 = null;
let saveFile8 = null;
let preserve = false;
let fileReader;

const editZone = document.getElementById("editZone");
const overview = document.getElementById("overview");
const levelSelect = document.getElementById("levelSelect");
const robeSelect = document.getElementById("robeSelect");
const scarfSelect = document.getElementById("scarfSelect");
const symbolSelect = document.getElementById("symbolSelect");
const backButton = document.getElementById("backButton");
let visible = null;

const offsets = {
    robe: 0x08,
    symbol: 0x0C,
    scarf: 0x10,
    level: 0x18
};

const robe = {
    robe: document.getElementById("robeImage"),
    currentColor: "red"
};

const symbol = {
    symbol: document.getElementById("symbol"),
    value: document.getElementById("symbolValue")
};

const scarf = {
    slider: document.getElementById("scarfSlider"),
    value: document.getElementById("scarfValue"),
    recommendation: document.getElementById("recommendation"),
    redScarfRecommandations: [7, 11, 17, 22, 28, 30] // + 5 for white scarf
};

const level = {
    level: document.getElementById("level"),
    value: document.getElementById("levelValue"),
    currentValue: 0,
    name: ["Chapter Select", "Broken Bridge", "Pink Desert", "Sunken City", "Underground", "Tower", "Snow", "Paradise", "Credits", "Level Bryan", "Level Matt", "Level Chris"]
}

// https://stackoverflow.com/a/11410079
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function setupCall() {
    changeVisibility([dropZoneVisibilityToggler, overview, editZone]);
    checkLevel();
}

function setScarfLengthRecommendationText() {
    const robeData = readData("uint8", offsets.robe);
    const color = robeData > 3 ? "white" : "red";
    robe.currentColor = color;

    const levelData = readData("uint8", offsets.level);
    level.currentValue = levelData;

    const levelToUse = level.currentValue - 1 >= scarf.redScarfRecommandations.length ? scarf.redScarfRecommandations.length - 1 : level.currentValue - 1;
    const suggestedScarfLength = scarf.redScarfRecommandations[levelToUse] + (robe.currentColor === "red" ? 0 : 5);
    const roundedSuggestedLength = clamp(suggestedScarfLength, 0, 30);
    scarf.recommendation.innerText = `Recommended scarf length for ${robe.currentColor} robe in ${level.name[level.currentValue]} is ${roundedSuggestedLength}`;
}

function robeChanger(task) {
    // make a safeguard if the save doesnt't have all glyphs unlocked
    // figure out how the games stores glyphs in the first place
    // also alert the user that his save will be modified a lot and he might get the transcendence trophy
    let robeData = readData("uint8", offsets.robe);
    let newTier, newColor;
    switch (task) {
        case "init":
            changeArrow("robe");
            changeVisibility([backButton, overview, robeSelect]);
            break;
        case "increment":
            newTier = robeData > 3 ? clamp(clamp(robeData + 1, 4, 7) % 7, 4, 6) : clamp(robeData + 1, 0, 4) % 4;
            writeData("uint8", offsets.robe, newTier);
            break;
        case "decrement":
            newTier = robeData > 3 ? robeData - 1 < 4 ? 6 : clamp(robeData - 1, 4, 6) : robeData - 1 < 0 ? 3 : clamp(robeData - 1, 0, 3);
            writeData("uint8", offsets.robe, newTier);
            break;
        case "changeColor":
            newColor = robeData ? robeData > 3 ? robeData - 3 : robeData + 3 : 4;
            writeData("uint8", offsets.robe, newColor);
            break;
    }
    robeData = readData("uint8", offsets.robe);
    let color = robeData > 3 ? "white" : "red";
    let tier = robeData > 3 ? robeData - 2 : robeData + 1;
    robe.robe.src = `./images/robes/${color}${tier}.png`;
}

function scarfChanger(task) {
    let scarfData = readData("uint8", offsets.scarf);
    switch (task) {
        case "init":
            changeVisibility([backButton, overview, scarfSelect]);
            scarf.value.innerText = scarfData;
            scarf.slider.value = scarfData;
            setScarfLengthRecommendationText();
            break;
        case "valueChange":
            scarf.value.innerText = scarf.slider.value;
            writeData("uint8", offsets.scarf, scarf.slider.value);
            break;
    }
}

scarf.slider.oninput = function () { scarfChanger("valueChange"); };

function symbolChanger(task) {
    let symbolData = readData("uint8", offsets.symbol);
    switch (task) {
        case "init":
            changeArrow("symbol");
            changeVisibility([backButton, overview, symbolSelect]);
            break;
        case "increment":
            symbolData += 1;
            symbolData %= 21; // positive wrap-around
            writeData("uint8", offsets.symbol, symbolData);
            break;
        case "decrement":
            symbolData = symbolData - 1 < 0 ? 20 : symbolData - 1; // negative wrap-around
            writeData("uint8", offsets.symbol, symbolData);
            break;
    }
    symbolData = readData("uint8", offsets.symbol);
    const hexUnicodeGlyphRepresentation = (symbolData + 1).toString(16).padStart(2, "0");
    symbol.symbol.innerText = String.fromCharCode("0xE0" + hexUnicodeGlyphRepresentation);
    symbol.value.innerText = `Symbol ${symbolData}`;
}

function levelChanger(task) {
    let levelData = readData("uint8", offsets.level);
    switch (task) {
        case "init":
            changeArrow("level");
            changeVisibility([backButton, overview, levelSelect]);
            break;
        case "increment":
            levelData += 1;
            levelData = levelData % 12 === 0 ? 1 : levelData;
            writeData("uint8", offsets.level, levelData);
            break;
        case "decrement":
            levelData = levelData - 1 < 1 ? 11 : levelData - 1;
            writeData("uint8", offsets.level, levelData);
            break;
    }
    levelData = readData("uint8", offsets.level);

    level.level.src = `./images/levels/${levelData}.png`;
    level.value.innerText = `${levelData} - ${level.name[levelData]}`;
    level.currentValue = levelData;
}

function checkLevel() {
    let levelData = readData("uint8", offsets.level);
    if (levelData === 0) {
        writeData("uint8", offsets.level, 1);
    }
}

function back() {
    changeVisibility([backButton, overview, visible]);
}

function changeArrow(prefix) {
    const left = document.getElementById(`${prefix}L`);
    const right = document.getElementById(`${prefix}R`);
    const integer = Math.floor(Math.random() * 4 + 1);
    left.src = `./images/arrows/arrow${integer}L.svg`;
    right.src = `./images/arrows/arrow${integer}R.svg`;
}

function writeData(type, offset, data) {
    let save = type === "uint8" ? saveFile8 : saveFile32;
    let ofs = type === "uint8" ? offset : offset / 4;
    if (save) {
        save[ofs] = data;
    }
}

// https://stackoverflow.com/a/30832210
function download() {
    debugAsHex(saveFile8);
    var file = new Blob([saveFile8]);
    if (window.navigator.msSaveBlob) // IE10+
        window.navigator.msSaveBlob(file, "SAVE.BIN");
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = "SAVE.BIN";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

// Moz wiki https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
function dropHandler(ev) {
    fileReader = new FileReader();
    fileReader.onload = (callbackEvent) => callback(callbackEvent);

    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[0].kind === 'file') {
            const file = ev.dataTransfer.items[0].getAsFile();
            fileReader.readAsArrayBuffer(file);
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        fileReader.readAsArrayBuffer(ev.dataTransfer.files[0]);
    }
}

function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function callback(callbackEvent) {
    saveFile8 = new Uint8Array(callbackEvent.target.result);
    saveFile32 = new Uint32Array(callbackEvent.target.result);
    setStorage("uint8", saveFile8);
    setStorage("uint32", saveFile32);
    setupCall();
}

function preserveData() {
    preserve = true;
}

function load() {
    if (localStorage.getItem("saveuint8") && localStorage.getItem("saveuint32")) {
        saveFile8 = getStorage("uint8");
        saveFile32 = getStorage("uint32");
        setupCall();
    }
}

function unload() {
    if (!preserve) {
        deleteStorage("uint8");
        deleteStorage("uint32");
        deleteStorage("Light");
    } else {
        if (saveFile8 && saveFile32) {
            setStorage("uint8", saveFile8);
            setStorage("uint32", saveFile32);
            if (document.body.style.backgroundImage === 'url("./images/cmatw_sunny.png")') {
                setStorage("Light", true);
            } else {
                deleteStorage("Light");
            }
        }
    }
}

function setStorage(type, data) {
    localStorage.setItem(`save${type}`, data);
}

function getStorage(type) {
    return type === "uint8" ? Uint8Array.from(localStorage.getItem("saveuint8").split(",")) : Uint32Array.from(localStorage.getItem("saveuint32").split(","));
}

function deleteStorage(type) {
    localStorage.removeItem(`save${type}`);
}

function readData(type, offset, until) {
    let save = type === "uint8" ? saveFile8 : saveFile32;
    let ofs = type === "uint8" ? offset : offset / 4;
    if (save) {
        if (typeof (until) === "undefined") {
            return save[ofs];
        } else {
            return save.slice(ofs, ofs + until);
        }
    }
}

function changeVisibility(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = !elements[i].hidden;
        if (!elements[i].hidden && typeof (visible) !== 'undefined') {
            visible = elements[i];
        }
        console.log(`Toggled ${elements[i].id} to hidden=${elements[i].hidden}`);
    }
}

function debugAsHex(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].toString(16));
    }
    console.log(res);
}