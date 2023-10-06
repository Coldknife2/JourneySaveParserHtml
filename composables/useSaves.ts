export default function() {
	return useState("saves", () => ({
		u8: new Uint8Array(),
		u32: new Uint32Array(),
		u64: new BigUint64Array()
	}));
}
