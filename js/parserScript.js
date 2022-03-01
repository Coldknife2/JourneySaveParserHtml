
const dropZoneVisibilityToggler = document.getElementById("dropZoneVisibilityToggler"); // display: flex & hidden does not works well together
let saveFile32 = null;
let saveFile8 = null;
let preserve = false;
let fileReader;

const resultZone = document.getElementById("resultZone");
const recentCompanions = document.getElementById("recentCompanions");
const olderCompanions = document.getElementById("olderCompanions");

function setupCall() {
    displayCompanions();
}

function displayCompanions() {
    const baseOffset = 0x19a8; // hex 19A8 thanks Journey wiki  
    const symbolOffset = 0x1200;
    const companionOffset = 0x1588;

    const companionNumber = readData("uint8", companionOffset);

    for (let i = 0; i < 8; i++) { // Let's read those 8 players entries
        const tempNameBuffer = readData("uint8", baseOffset+32*i, 24);
        const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
        const name = new TextDecoder().decode(nameBuffer);

        const steamIdV3int32 = readData("uint32", baseOffset+32*i+24);
        const steamIdV3 = `[U:1:${steamIdV3int32}]`;
        const safeHtmlSteamIdV3 = encodeURIComponent(steamIdV3);
        const steamLink = "https://steamcommunity.com/profiles/" + safeHtmlSteamIdV3;

        const symbolNumber = readData("uint8", symbolOffset+60*i);

        const hexUnicodeGlyphRepresentation = (symbolNumber + 1).toString(16).padStart(2, "0");

        const container = document.createElement("a");
        container.className = "container hov";
        container.href = steamLink;
        container.target = "_blank";

        const div = document.createElement("div");
        div.innerText = name;
        div.className = "playerDisplay";

        const symbol = document.createElement("div");
        symbol.className = "glyphDisplay";
        symbol.innerText = String.fromCharCode("0xE0" + hexUnicodeGlyphRepresentation);
        container.appendChild(symbol);
        container.appendChild(div);
        
        if (steamIdV3int32 != 0) {
            const tdBuffer = document.createElement("td");
            tdBuffer.className = "td-buffer";
            
            if (i < companionNumber) {
                recentCompanions.appendChild(container);
            } else {
                olderCompanions.appendChild(container);
            }
        } else { 
            break; 
        }
        console.log(`
iteration: ${i}
baseOffset: ${baseOffset+32*i}
idOffset: ${baseOffset+32*i+24}
symbolOffset: ${symbolOffset+60*i}

name: ${name}
steamLink: ${steamLink}
steamID3: ${steamIdV3}
symbol: ${symbol}

`)
    }
    changeVisibility([dropZoneVisibilityToggler, resultZone]);
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
    return type === "uint8" ? Uint8Array.from(localStorage.getItem("saveuint8").split(",")): Uint32Array.from(localStorage.getItem("saveuint32").split(","));
}

function deleteStorage(type) {
    localStorage.removeItem(`save${type}`);
}

function readData(type, offset, until) {
    let save = type === "uint8" ? saveFile8 : saveFile32;
    let ofs = type === "uint8" ? offset : offset/4;
    if (save) {
        if (typeof(until) === "undefined") {
            return save[ofs];
        } else {
            return save.slice(ofs, ofs+until);
        }
    }
}

function changeVisibility(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = !elements[i].hidden;
        if (!elements[i].hidden && typeof(visible) !== 'undefined') {
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