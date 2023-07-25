<script setup lang="ts">
import { Companions } from "utils/interfaces";

const saves = useSaves().value;
let companions = new Array<Companions>();
let pastCompanions = new Array<Companions>();

const companionNumber = readData(saves, "u8", offsets.companionAmount) as number;
for (let i = 0; i < 8; i++) {
	const tempNameBuffer = readData(saves, "u8", offsets.companionName+offsets.companionOffset*i, 24) as Uint8Array;
	const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
	const name = new TextDecoder().decode(nameBuffer);

	const steamIdV3int32 = readData(saves, "u32", offsets.companionID+offsets.companionOffset*i) as number;
	const steamIdV3 = `[U:1:${steamIdV3int32}]`;
	const safeHtmlSteamIdV3 = encodeURIComponent(steamIdV3);
	const steamLink = "https://steamcommunity.com/profiles/" + safeHtmlSteamIdV3;

	const symbolNumber = readData(saves, "u8", offsets.companionSymbol+offsets.companionSymbolOffset*i) as number;
	const symbol = 0xF101 + symbolNumber;

	const companionData = { l: steamLink, n: name, s: symbol };
	if (steamIdV3int32 !== 0) {
		(i < companionNumber) ? companions.push(companionData) : pastCompanions.push(companionData);
	} else {
		break;
	}
}
</script>

<template>
	<ParserPlayerDisplay :companions="companions" :past-companions="pastCompanions" />
</template>
