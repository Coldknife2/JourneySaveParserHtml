
const dropZoneVisibilityToggler = document.getElementById("dropZoneVisibilityToggler"); // display: flex & hidden does not works well together
const resultZone = document.getElementById("resultZone");

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

function callback(callbackEvent) {
    
    const arrayBuffer = callbackEvent.target.result;
    const baseOffset = 0x19a8;// hex 19A8 thanks Journey wiki  
    const symbolOffset = 0x1200;

    const p = document.createElement("p");
    p.innerText = "Companions Met Along The Way";
    p.className = "cmatw"; // seperate because of text-shadow attribute
    document.getElementById("resultZone").appendChild(p);

    createTable();

    for(let i = 0; i < 8; i++) { // Let's read those 8 players entries
        const tempNameBuffer = new Uint8Array(fileReader.result, baseOffset+32*i, 24);
        const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
        const name = new TextDecoder().decode(nameBuffer);

        const steamIdV3int32 = readFromFile(fileReader.result, baseOffset+32*i+24, 4);
        const steamIdV3 = `[U:1:${steamIdV3int32}]`;
        const safeHtmlSteamIdV3 = encodeURIComponent(steamIdV3);
        const steamLink = "https://steamcommunity.com/profiles/" + safeHtmlSteamIdV3;

        const symbolBuffer = readFromFile(fileReader.result, symbolOffset+60*i, 4);
        const symbol = `images/${symbolBuffer}.svg`;

        const container = document.createElement("div");
        container.className = "container";

        const div = document.createElement("a");
        div.href = steamLink;
        div.innerText = name;
        div.className = "playerDisplay";

        const img = new Image();
        img.className = "symbol";
        img.src = symbol;

        container.appendChild(img);
        container.appendChild(div);

        if (steamIdV3int32 != 0) {
            td = document.createElement("td");
            td.appendChild(container);
            document.getElementById("row"+i%4).appendChild(td);
        }
        console.log(name);
        console.log(steamLink, steamIdV3);
        console.log(symbol);

        dropZoneVisibilityToggler.hidden = true;
        resultZone.hidden = false;
    }
}

function createTable() { // could just be hardcoded in html
    const table = document.createElement("table");
    table.className = "resultTable";
    for (let i = 0; i < 4; i++) { 
        row = document.createElement("tr");
        row.id = "row"+i;
        table.appendChild(row);
    }
    document.getElementById("resultZone").appendChild(table);
}

function readFromFile(file, offset, size) {
    return new DataView(file, offset, size).getInt32(0, true);
}

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}