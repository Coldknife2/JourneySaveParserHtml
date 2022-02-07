
const dropZoneVisibilityToggler = document.getElementById("dropZoneVisibilityToggler"); // display: flex & hidden does not works well together
const editZone = document.getElementById("editZone");
const overview = document.getElementById("overview");
const levelSelect = document.getElementById("levelSelect");
const robeSelect = document.getElementById("robeSelect");
const scarfSelect = document.getElementById("scarfSelect");
const symbolSelect = document.getElementById("symbolSelect");
const backButton = document.getElementById("backButton");
let saveFile = null;
let visible = null;
let preserve = false;
let fileReader;

const offsets = {
    robe: 0x08,
    symbol: 0x0C,
    scarf: 0x10,
    level: 0x18
};

const robe = {
    robe: document.getElementById("robeImage"),
};

const symbol = {
    symbol: document.getElementById("symbol"),
    value: document.getElementById("symbolValue")
};

const scarf = {
    slider: document.getElementById("scarfSlider"),
    value: document.getElementById("scarfValue")
};

const level = {
    level: document.getElementById("level"),
    value: document.getElementById("levelValue")
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
            let file = ev.dataTransfer.items[0].getAsFile();
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

function setStorage(data) {
    localStorage.setItem("save", data);
}

function getStorage() {
    return Uint8Array.from(localStorage.getItem("save").split(","));
}

function deleteStorage() {
    localStorage.removeItem("save");
}

function readData(offset, until) {
    if (saveFile) {
        if (typeof(until) === 'undefined') {
            return saveFile[offset];
        } else {
            return saveFile.slice(offset, offset+until);
        }
    }
}

function writeData(offset, data) {
    if (saveFile) {
        saveFile[offset] = data;
    }
}

// https://stackoverflow.com/a/11410079
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function callback(callbackEvent) {
    saveFile = new Uint8Array(callbackEvent.target.result);
    setStorage(saveFile);
    changeVisibility([dropZoneVisibilityToggler, overview, editZone]);
}

function robeChanger(task) {
    // make a safeguard if the save doesnt't have all glyphs unlocked
    // figure out how the games stores glyphs in the first place
    // also alert the user that his save will be modified a lot and he might get the transcendence trophy
    let robeData = readData(offsets.robe);
    let newTier, newColor;
    switch (task) {
        case "init":
            changeArrow("robe")
            changeVisibility([overview, robeSelect, backButton]);
            break;
        case "increment":
            newTier = robeData > 3 ? clamp(clamp(robeData+1, 4, 7) % 7, 4, 6) : clamp(robeData+1, 0, 4) % 4;
            writeData(offsets.robe, newTier);
            break;
        case "decrement":
            newTier = robeData > 3 ? robeData-1 < 4 ? 6 : clamp(robeData-1, 4, 6) : robeData-1 < 0 ? 3 : clamp(robeData-1, 0, 3);
            writeData(offsets.robe, newTier);
            break;
        case "changeColor":
            newColor = robeData ? robeData > 3 ? robeData-3 : robeData+3 : 4;
            writeData(offsets.robe, newColor);
            break;
    }
    robeData = readData(offsets.robe);
    let color = robeData > 3 ? "white" : "red";
    let tier = robeData > 3 ? robeData-2 : robeData+1;
    robe.robe.src = `images/${color}${tier}.png`;
}

function scarfChanger(task) {
    let scarfData = readData(offsets.scarf);
    switch (task) {
        case "init":
            changeVisibility([overview, scarfSelect, backButton]);
            scarf.value.innerText = scarfData;
            scarf.slider.value = scarfData;
            break;
        case "valueChange":
            scarf.value.innerText = scarf.slider.value;
            writeData(offsets.scarf, scarf.slider.value);
            break;
    }
}

scarf.slider.oninput = function() {scarfChanger("valueChange");};

function symbolChanger(task) {
    let symbolData = readData(offsets.symbol);
    switch (task) {
        case "init":
            changeArrow("symbol")
            changeVisibility([overview, symbolSelect, backButton]);
            break;
        case "increment":
            symbolData += 1;
            symbolData %= 21; // positive wrap-around
            writeData(offsets.symbol, symbolData);
            break;
        case "decrement":
            symbolData = symbolData-1 < 0 ? 20 : symbolData-1; // negative wrap-around
            writeData(offsets.symbol, symbolData);
            break;
    }
    symbolData = readData(offsets.symbol);
    symbol.symbol.src = `images/${symbolData}.svg`;
    symbol.value.innerText = `Symbol ${symbolData}`;
}

function levelChanger(task) {
    let levelData = readData(offsets.level);
    switch (task) {
        case "init":
            changeArrow("level")
            changeVisibility([overview, levelSelect, backButton]);
            break;
        case "increment":
            levelData += 1;
            levelData %= 12;
            writeData(offsets.level, levelData);
            break;
        case "decrement":
            levelData = levelData-1 < 0 ? 11 : levelData-1;
            writeData(offsets.level, levelData);
            break;
    }
    levelData = readData(offsets.level);
    level.level.src = `images/${levelData}.svg`; // make level screenshots?
    level.value.innerText = levelData;
}

function back() {
    changeVisibility([backButton, overview, visible]);
}

function changeVisibility(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = !elements[i].hidden;
        if (!elements[i].hidden && elements[i] !== backButton) {
            visible = elements[i];
        }
        console.log(`Toggled ${elements[i].id} to hidden=${elements[i].hidden}`);
    }
}

function changeArrow(prefix) {
    const left = document.getElementById(`${prefix}L`);
    const right = document.getElementById(`${prefix}R`);
    const integer = Math.floor(Math.random() * 4 + 1);
    left.src = `images/arrow${integer}L.svg`;
    right.src = `images/arrow${integer}R.svg`;
}

// https://stackoverflow.com/a/30832210
function download() {
    console.log(saveFile)
    debugAsHex(saveFile)
    var file = new Blob([saveFile]);
    console.log(file)
    if (window.navigator.msSaveBlob) // IE10+
        window.navigator.msSaveBlob(file, "SAVE.BIN");
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "SAVE.BIN";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function unload() {
    if (!preserve) {
        deleteStorage();
    } else {
        if (saveFile) {
            setStorage(saveFile);
        }
    }
}

function load() {
    if (localStorage.getItem("save")) {
        saveFile = getStorage();
        changeVisibility([dropZoneVisibilityToggler, overview, editZone]);
    }
}

function preserveData() {
    preserve = true;
}

function debugAsHex(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].toString(16));
    }
    console.log(res);
}