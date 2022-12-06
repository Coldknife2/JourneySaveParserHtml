export function writeData(
	saves: { u8: Uint8Array, u32: Uint32Array, u64: BigUint64Array },
	type: "u8" | "u32" | "u64",
	offset: number,
	data: number
) {
	const divisor = type === "u8" ? 1 : type === "u32" ? 4 : 8;
	saves[type][offset/divisor] = data;
}

export function readData(
	saves: { u8: Uint8Array, u32: Uint32Array, u64: BigUint64Array },
	type: "u8" | "u32" | "u64",
	offset: number, until: number | undefined = undefined
) {
	const divisor = type === "u8" ? 1 : type === "u32" ? 4 : 8;
	if (typeof until === "undefined") {
		return Number(saves[type][offset/divisor]);
	} else {
		return saves[type].slice(offset, offset+until);
	}
}
