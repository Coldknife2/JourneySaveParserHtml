class MemoryStorage {
	data: Record<string, string>;
	constructor() {
		this.data = {};
	}

	getItem(key: string) {
		return this.data[key];
	}

	setItem(key: string, data: string) {
		this.data[key] = data;
	}

	removeItem(key: string) {
		delete this.data[key];
	}
}

let save8: Uint8Array;
let save32: Uint32Array;
const storage = checkLocalStorageAvailable() ? localStorage : new MemoryStorage();

export function checkLocalStorageAvailable() {
	try {
		const testKey = "__test_save";
		localStorage.setItem(testKey, testKey);
		localStorage.getItem(testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch {
		return false;
	}
}

export function initializeSaves() {
	getStorage("uint8");
	getStorage("uint32");
}

export function setStorage(type: string, data: Uint8Array | Uint32Array) {
	if (type === "uint8") {
		save8 = data as Uint8Array;
	} else {
		save32 = data as Uint32Array;
	}
	storage.setItem(`save${type}`, data.toString());
}

export function getStorage(type: string) {
	const local = storage.getItem(`save${type}`)?.split(",").map(Number) as Array<number> | undefined;
	if (local === undefined) { return false; }
	const s8 = Uint8Array.from(local);
	const s32 = Uint32Array.from(local);
	if (type === "uint8") {
		save8 = s8 as Uint8Array;
	} else {
		save32 = s32 as Uint32Array;
	}
	return type === "uint8" ? save8 : save32;
}

export function deleteStorage(type: string) {
	storage.removeItem(`save${type}`);
}

export function clearLocalStorage(remove: boolean) {
	if (remove) {
		deleteStorage("uint8");
		deleteStorage("uint32");
		deleteStorage("light");
	} else {
		if (document.body.className == "light") {
			setStorage("light", new Uint8Array(1));
		}
	}
}

export function writeData(type: string, offset: number, data: number) {
	const save = type === "uint8" ? save8 : save32;
	const ofs = type === "uint8" ? offset : offset / 4;
	if (save) {
		save[ofs] = data;
		setStorage(type, save);
	}
}

export function readData(type: string, offset: number, until: number | undefined = undefined) {
	const save = type === "uint8" ? save8 : save32;
	const ofs = type === "uint8" ? offset : offset / 4;
	if (save) {
		if (typeof (until) === "undefined") {
			return save[ofs];
		} else {
			return save.slice(ofs, ofs + until);
		}
	}
}

export function debugAsHex(arr: Array<number>) {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		res.push(arr[i].toString(16));
	}
	console.log(res);
}
