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

<script lang="ts">
export default defineComponent({
	data() {
		return {
			symbolData: new Array<Array<boolean>>(),
			randomSymbols: new Array<Array<number>>(),
			saves: useSaves(),
			k: (i: number) => i > 3 || i == 2 ? 4 : 3
		};
	},
	mounted() {
		this.makeRandomSymbols();
		this.extractSymbolData();
	},
	methods: {
		extractSymbolData() {
			for (let i=0; i<6; i++) {
				const data = (readData(this.saves, "u8", offsets.glyphValue+offsets.glyphOffset*i) as number).toString(2);
				const dataSplit = data.split("").map(Number).map(Boolean);
				while (dataSplit.length < this.k(i)) {
					dataSplit.unshift(false);
				}
				this.symbolData.push(dataSplit);
			}
		},
		makeRandomSymbols() {
			const symbols = shuffle([...Array(21).keys()]);
			for (let i=0; i<6; i++) {
				let l = [];
				for (let j = 0; j<this.k(i); j++) {
					l.push(symbols.pop());
				}
				this.randomSymbols.push(l);
			}
		}
	}
});
</script>
