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

function dragOverHandler(ev) {
	ev.preventDefault();
}

const navbarElements = document.getElementsByClassName("flex-item");
for (let i=0; i<navbarElements.length; i++) {
	navbarElements[i].addEventListener("click", function() {
		preserveData();
	});
}
window.addEventListener("beforeunload", function() { unload(); });
document.addEventListener("drop", function(event) { dragOverHandler(event); });
document.addEventListener("dragover", function(event) { dragOverHandler(event); });