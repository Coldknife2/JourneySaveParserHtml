let preserve = false;

function preserveData() {
    preserve = true;
}

function deleteStorage(type) {
    localStorage.removeItem(`save${type}`);
}

function unload() {
    if (!preserve) {
        deleteStorage("uint8");
        deleteStorage("uint32");
        deleteStorage("Light");
    }
}

const navbarElements = document.getElementsByClassName("flex-item");
for (let i=0; i<navbarElements.length; i++) {
    navbarElements[i].addEventListener("click", function() { preserveData(); });
}
window.onbeforeunload = function() { unload(); }
document.getElementById("dropSymbol").addEventListener("click", function() { toggleNavbar(); });
document.addEventListener("drop", function(event) { dragOverHandler(event); });
document.addEventListener("dragover", function(event) { dragOverHandler(event); });