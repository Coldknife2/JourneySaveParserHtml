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
let save16: Uint16Array;
let save32: Uint32Array;
let save64: BigUint64Array;
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
	getStorage("uint16");
	getStorage("uint32");
	getStorage("uint64");
}

export function setStorage(type: string, data: Uint8Array | Uint16Array | Uint32Array | BigUint64Array) {
	switch (type) {
		case "uint8":
			save8 = data as Uint8Array;
			break;
		case "uint16":
			save16 = data as Uint16Array;
			break;
		case "uint32":
			save32 = data as Uint32Array;
			break;
		case "uint64":
			save64 = data as BigUint64Array;
			break;
	}
	storage.setItem(`save${type}`, data.toString());
}

export function getStorage(type: string) {
	const local = storage.getItem(`save${type}`)?.split(",").map(Number) as Array<number> | undefined;
	if (local === undefined) { return false; }
	const s8 = Uint8Array.from(local);
	const s16 = Uint16Array.from(local);
	const s32 = Uint32Array.from(local);
	const s64 = BigUint64Array.from(local.map(BigInt));
	switch (type) {
		case "uint8":
			save8 = s8 as Uint8Array;
			return save8;
		case "uint16":
			save16 = s16 as Uint16Array;
			return save16;
		case "uint32":
			save32 = s32 as Uint32Array;
			return save32;
		case "uint64":
			save64 = s64 as BigUint64Array;
			return save64;
	}
}

export function deleteStorage(type: string) {
	storage.removeItem(`save${type}`);
}

export function clearLocalStorage(remove: boolean) {
	if (remove) {
		deleteStorage("uint8");
		deleteStorage("uint16");
		deleteStorage("uint32");
		deleteStorage("uint64");
		deleteStorage("light");
	} else {
		if (document.body.className == "light") {
			setStorage("light", new Uint8Array(1));
		}
	}
}

export function writeData(type: string, offset: number, data: number) {
	const typeOffsetData = determineTypeAndOffset(type, offset);
	const save = typeOffsetData.s;
	const ofs = typeOffsetData.o;
	if (save && ofs) {
		save[ofs] = data;
		setStorage(type, save);
	}
}

export function readData(type: string, offset: number, until: number | undefined = undefined) {
	const typeOffsetData = determineTypeAndOffset(type, offset);
	const save = typeOffsetData.s;
	const ofs = typeOffsetData.o;
	if (save && ofs) {
		if (typeof (until) === "undefined") {
			return Number(save[ofs]);
		} else {
			return save.slice(ofs, ofs + until);
		}
	}
}

function determineTypeAndOffset(type: string, offset: number) {
	let save, ofs;
	switch (type) {
		case "uint8":
			save = save8;
			ofs = offset;
			break;
		case "uint16":
			save = save16;
			ofs = offset / 2;
			break;
		case "uint32":
			save = save32;
			ofs = offset / 4;
			break;
		case "uint64":
			save = save64;
			ofs = offset / 8;
			break;
	}
	return { s: save, o: ofs };
}

export function debugAsHex(arr: Array<number>) {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		res.push(arr[i].toString(16));
	}
	console.log(res);
}
