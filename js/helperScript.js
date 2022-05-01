
// eslint-disable-next-line no-unused-vars
class JourneyHelper {
	constructor(fun) {
		this.setupCall = fun;
		this.saveFile32 = null;
		this.saveFile8 = null;
		this.preserve = false;
		this.fileReader;
		this.visible = null;
		this.dropZone = document.getElementById("dropZone");
		this.dropZoneVisibilityToggler = document.getElementById("dropZoneVisibilityToggler"); // display: flex & hidden does not works well together
		this.setDraggableFalse();
	}

	// Moz wiki https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
	dropHandler(ev) {
		this.fileReader = new FileReader();
		this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);

		console.log("File(s) dropped");

		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();

		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			// If dropped items aren't files, reject them
			if (ev.dataTransfer.items[0].kind === "file") {
				const file = ev.dataTransfer.items[0].getAsFile();
				this.fileReader.readAsArrayBuffer(file);
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			this.fileReader.readAsArrayBuffer(ev.dataTransfer.files[0]);
		}
	}

	dragOverHandler(ev) {
		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();
	}

	callback(callbackEvent) {
		this.saveFile8 = new Uint8Array(callbackEvent.target.result);
		this.saveFile32 = new Uint32Array(callbackEvent.target.result);
		this.setStorage("uint8", this.saveFile8);
		this.setStorage("uint32", this.saveFile32);
		this.setupCall();
	}

	attachGeneralListeners() {
		const navbarElements = document.getElementsByClassName("flex-item");
		for (let i=0; i<navbarElements.length; i++) {
			// if the href is not the same as the pathname of the html file - if href doesn't link to the file it came from
			if (navbarElements[i].href.split("/")[navbarElements[i].href.split("/").length -1] !== location.pathname.replace("/", "")) {
				navbarElements[i].addEventListener("click", () => this.preserveData()); // this gets assigned to something else here, need to preserve class reference
			}
		}
		window.addEventListener("load", () => this.load());
		window.addEventListener("beforeunload", () => this.unload());

		this.dropZone.addEventListener("drop", (event) => this.dropHandler(event));
		this.dropZone.addEventListener("dragover", (event) => this.dragOverHandler(event));

		document.addEventListener("drop", (event) => this.dragOverHandler(event));
		document.addEventListener("dragover", (event) => this.dragOverHandler(event));
	}

	setDraggableFalse() {
		const divs = document.getElementsByTagName("div");
		for (const div of divs) {
			div.addEventListener("dragstart", (e) => e.preventDefault());
			if (div.id.indexOf("dropZone") === -1) {
				div.addEventListener("drop", (e) => e.preventDefault());
			}
		}
	}

	preserveData() {
		this.preserve = true;
	}

	load() {
		if (localStorage.getItem("saveuint8") && localStorage.getItem("saveuint32")) {
			this.saveFile8 = this.getStorage("uint8");
			this.saveFile32 = this.getStorage("uint32");
			this.setupCall();
		}
	}

	unload() {
		if (!this.preserve) {
			this.deleteStorage("uint8");
			this.deleteStorage("uint32");
			this.deleteStorage("Light");
		} else {
			if (this.saveFile8 && this.saveFile32) {
				this.setStorage("uint8", this.saveFile8);
				this.setStorage("uint32", this.saveFile32);
				if (document.body.style.backgroundImage === "url(\"./images/cmatw_sunny.png\")") {
					this.setStorage("Light", true);
				} else {
					this.deleteStorage("Light");
				}
			}
		}
	}

	setStorage(type, data) {
		localStorage.setItem(`save${type}`, data);
	}

	getStorage(type) {
		return type === "uint8" ? Uint8Array.from(localStorage.getItem("saveuint8").split(",")) : Uint32Array.from(localStorage.getItem("saveuint32").split(","));
	}

	deleteStorage(type) {
		localStorage.removeItem(`save${type}`);
	}

	readData(type, offset, until) {
		let save = type === "uint8" ? this.saveFile8 : this.saveFile32;
		let ofs = type === "uint8" ? offset : offset / 4;
		if (save) {
			if (typeof (until) === "undefined") {
				return save[ofs];
			} else {
				return save.slice(ofs, ofs + until);
			}
		}
	}

	writeData(type, offset, data) {
		let save = type === "uint8" ? this.saveFile8 : this.saveFile32;
		let ofs = type === "uint8" ? offset : offset / 4;
		if (save) {
			save[ofs] = data;
		}
	}

	changeVisibility(elements) {
		for (let i = 0; i < elements.length; i++) {
			elements[i].hidden = !elements[i].hidden;
			if (!elements[i].hidden) {
				this.visible = elements[i];
			}
			console.log(`Toggled ${elements[i].id} to hidden=${elements[i].hidden}`);
		}
	}

	debugAsHex(arr) {
		let res = [];
		for (let i = 0; i < arr.length; i++) {
			res.push(arr[i].toString(16));
		}
		console.log(res);
	}
}