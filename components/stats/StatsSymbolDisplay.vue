<script setup lang="ts">
const saves = useSaves().value;
const symbolData = new Array<Array<boolean>>();
const randomSymbols = new Array<Array<number>>();

function sectionLength(idx: number) {
	return idx > 3 || idx == 2 ? 4 : 3;
}

for (let i=0; i<6; i++) {
	const data = readData(saves, "u8", offsets.glyphValue+offsets.glyphOffset*i).toString(2);
	const dataSplit = data.split("").map(Number).map(Boolean);
	while (dataSplit.length < sectionLength(i)) {
		dataSplit.unshift(false);
	}
	symbolData.push(dataSplit);
}

const symbols = shuffle([...Array(21).keys()]);
for (let i=0; i<6; i++) {
	let sym = [];
	for (let j=0; j<sectionLength(i); j++) {
		sym.push(symbols.pop());
	}
	randomSymbols.push(sym);
}
</script>

<template>
	<StatsItemRow
		v-for="lvl in symbolData.length"
		:key="lvl"
		:row-name="levelNames[lvl-1]"
	>
		<template #rowContent>
			<StatsHoverItem
				v-for="glyph in symbolData[lvl-1].length"
				:key="glyph"
				:unlocked="symbolData[lvl-1][glyph-1]"
				:index="[0, lvl-1, glyph-1]"
				:symbol="0xF101+randomSymbols[lvl-1][glyph-1]"
			/>
		</template>
	</StatsItemRow>
</template>
