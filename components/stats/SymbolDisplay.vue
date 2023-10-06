<script setup lang="ts">
import { locations } from "images";
const saves = useSaves().value;
const symbolData = ref([] as Array<Array<boolean>>);
const randomSymbols = new Array<Array<number>>();

const symbols = shuffle([...Array(21).keys()]);
for (let i=0; i<6; i++) {
	let sym = [];
	for (let j=0; j<sectionLength(i); j++) {
		sym.push(symbols.pop());
	}
	randomSymbols.push(sym);
}

function sectionLength(idx: number) {
	return idx > 3 || idx === 2 ? 4 : 3;
}

const createData = () => {
	let tempSymbolData = new Array<Array<boolean>>();
	for (let i=0; i<6; i++) {
		const data = readData(saves, "u8", offsets.glyphValue+offsets.glyphOffset*i).toString(2);
		const dataSplit = data.split("").map(Number).map(Boolean);
		while (dataSplit.length < sectionLength(i)) {
			dataSplit.unshift(false);
		}
		tempSymbolData.push(dataSplit.reverse());
	}
	symbolData.value = tempSymbolData;
};

createData();
watch(saves, () => createData(), { deep: true });
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
				:src="locations[0][lvl-1][glyph-1]"
				:symbol="0xF101+randomSymbols[lvl-1][glyph-1]"
			/>
		</template>
	</StatsItemRow>
</template>
